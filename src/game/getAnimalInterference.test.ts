import { describe, expect, it } from 'vitest'
import { getAnimalInterference } from './getAnimalInterference'

// =====================================================
// WORLD 8 — FROG INVASION TESTS
// =====================================================

describe('getAnimalInterference', () => {
  // ---------------------------------------------------
  // 8.1 — SINGLE FROG
  // ---------------------------------------------------

  it('does nothing before the first frog jumps', () => {
    const result = getAnimalInterference({
      mode: 'single',
      elapsedTime: 1,
      triggerTimes: [1.4],
      displacement: 8,
      exitDisplacement: 0,
      obstruction: 0,
      shakeStrength: 0,
    })

    expect(result.triggeredEvents).toBe(0)
    expect(result.waterOffset).toBe(0)
    expect(result.frogsInGlass).toBe(0)
    expect(result.isActive).toBe(false)
  })

  it('adds the frog displacement after the jump', () => {
    const result = getAnimalInterference({
      mode: 'single',
      elapsedTime: 1.4,
      triggerTimes: [1.4],
      displacement: 8,
      exitDisplacement: 0,
      obstruction: 0,
      shakeStrength: 0,
    })

    expect(result.triggeredEvents).toBe(1)
    expect(result.waterOffset).toBe(8)
    expect(result.frogsInGlass).toBe(1)
    expect(result.isActive).toBe(true)
  })

  // ---------------------------------------------------
  // 8.2 — DOUBLE FROG
  // ---------------------------------------------------

  it('applies only the first displacement after one frog', () => {
    const result = getAnimalInterference({
      mode: 'double',
      elapsedTime: 1.2,
      triggerTimes: [0.9, 1.7],
      displacement: 6,
      exitDisplacement: 0,
      obstruction: 0,
      shakeStrength: 0,
    })

    expect(result.triggeredEvents).toBe(1)
    expect(result.waterOffset).toBe(6)
    expect(result.frogsInGlass).toBe(1)
  })

  it('accumulates both frog displacements', () => {
    const result = getAnimalInterference({
      mode: 'double',
      elapsedTime: 1.7,
      triggerTimes: [0.9, 1.7],
      displacement: 6,
      exitDisplacement: 0,
      obstruction: 0,
      shakeStrength: 0,
    })

    expect(result.triggeredEvents).toBe(2)
    expect(result.waterOffset).toBe(12)
    expect(result.frogsInGlass).toBe(2)
  })

  // ---------------------------------------------------
  // 8.3 — IN / OUT
  // ---------------------------------------------------

  it('raises the water when the frog jumps in', () => {
    const result = getAnimalInterference({
      mode: 'in-out',
      elapsedTime: 1.2,
      triggerTimes: [1, 1.8],
      displacement: 9,
      exitDisplacement: 9,
      obstruction: 0,
      shakeStrength: 0,
    })

    expect(result.triggeredEvents).toBe(1)
    expect(result.waterOffset).toBe(9)
    expect(result.frogsInGlass).toBe(1)
  })

  it('removes the displacement when the frog jumps out', () => {
    const result = getAnimalInterference({
      mode: 'in-out',
      elapsedTime: 1.8,
      triggerTimes: [1, 1.8],
      displacement: 9,
      exitDisplacement: 9,
      obstruction: 0,
      shakeStrength: 0,
    })

    expect(result.triggeredEvents).toBe(2)
    expect(result.waterOffset).toBe(0)
    expect(result.frogsInGlass).toBe(0)
  })

  // ---------------------------------------------------
  // 8.4 — INVASION
  // ---------------------------------------------------

  it('accumulates several frogs during the invasion', () => {
    const result = getAnimalInterference({
      mode: 'invasion',
      elapsedTime: 1.3,
      triggerTimes: [0.7, 1.2, 1.7],
      displacement: 4,
      exitDisplacement: 0,
      obstruction: 45,
      shakeStrength: 0,
    })

    expect(result.triggeredEvents).toBe(2)
    expect(result.frogsInGlass).toBe(2)
    expect(result.waterOffset).toBe(8)
    expect(result.visualObstruction).toBe(45)
  })

  // ---------------------------------------------------
  // 8.5 — APOCALYPSE
  // ---------------------------------------------------

  it('combines displacement, obstruction and movement', () => {
    const result = getAnimalInterference({
      mode: 'apocalypse',
      elapsedTime: 1.6,
      triggerTimes: [0.6, 1.05, 1.5, 1.95],
      displacement: 3,
      exitDisplacement: 0,
      obstruction: 55,
      shakeStrength: 12,
    })

    expect(result.triggeredEvents).toBe(3)
    expect(result.frogsInGlass).toBe(3)
    expect(result.waterOffset).toBe(9)
    expect(result.visualObstruction).toBe(55)

    const isMoving =
      result.glassOffsetX !== 0 ||
      result.glassOffsetY !== 0 ||
      result.glassRotation !== 0

    expect(isMoving).toBe(true)
  })

  // ---------------------------------------------------
  // SAFETY / EDGE CASES
  // ---------------------------------------------------

  it('clamps negative gameplay values to zero', () => {
    const result = getAnimalInterference({
      mode: 'single',
      elapsedTime: 2,
      triggerTimes: [1],
      displacement: -10,
      exitDisplacement: -5,
      obstruction: -30,
      shakeStrength: -20,
    })

    expect(result.waterOffset).toBe(0)
    expect(result.visualObstruction).toBe(0)
    expect(result.glassOffsetX).toBe(0)
    expect(result.glassOffsetY).toBe(0)
    expect(result.glassRotation).toBe(0)
  })

  it('clamps obstruction to 100 percent', () => {
    const result = getAnimalInterference({
      mode: 'invasion',
      elapsedTime: 2,
      triggerTimes: [1],
      displacement: 4,
      exitDisplacement: 0,
      obstruction: 150,
      shakeStrength: 0,
    })

    expect(result.visualObstruction).toBe(100)
  })

  it('handles trigger times even if they are not ordered', () => {
    const result = getAnimalInterference({
      mode: 'double',
      elapsedTime: 1.2,
      triggerTimes: [1.7, 0.9],
      displacement: 6,
      exitDisplacement: 0,
      obstruction: 0,
      shakeStrength: 0,
    })

    expect(result.triggeredEvents).toBe(1)
    expect(result.waterOffset).toBe(6)
  })
})