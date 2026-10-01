import { describe, expect, it } from 'vitest'
import { getObstacleEffect } from './getObstacleEffect'

describe('getObstacleEffect', () => {
  it('keeps the normal flow when the water is far from a fixed obstacle', () => {
    const effect = getObstacleEffect({
      waterLevel: 20,
      elapsedTime: 0,
      mode: 'fixed',
      strength: 0.45,
      positions: [45],
      movementSpeed: 0,
    })

    expect(effect.flowMultiplier).toBe(1)
    expect(effect.isBlockingFlow).toBe(false)
    expect(effect.activePositions).toEqual([45])
  })

  it('slows the flow when the water reaches a fixed obstacle', () => {
    const effect = getObstacleEffect({
      waterLevel: 45,
      elapsedTime: 0,
      mode: 'fixed',
      strength: 0.45,
      positions: [45],
      movementSpeed: 0,
    })

    expect(effect.flowMultiplier).toBeCloseTo(0.55)
    expect(effect.isBlockingFlow).toBe(true)
    expect(effect.activePositions).toEqual([45])
  })

  it('can activate either obstacle in double mode', () => {
    const firstObstacle = getObstacleEffect({
      waterLevel: 35,
      elapsedTime: 0,
      mode: 'double',
      strength: 0.5,
      positions: [35, 62],
      movementSpeed: 0,
    })

    const secondObstacle = getObstacleEffect({
      waterLevel: 62,
      elapsedTime: 0,
      mode: 'double',
      strength: 0.5,
      positions: [35, 62],
      movementSpeed: 0,
    })

    expect(firstObstacle.isBlockingFlow).toBe(true)
    expect(firstObstacle.flowMultiplier).toBeCloseTo(0.5)

    expect(secondObstacle.isBlockingFlow).toBe(true)
    expect(secondObstacle.flowMultiplier).toBeCloseTo(0.5)
  })

  it('clamps excessive obstacle strength so the flow never becomes negative', () => {
    const effect = getObstacleEffect({
      waterLevel: 50,
      elapsedTime: 0,
      mode: 'fixed',
      strength: 5,
      positions: [50],
      movementSpeed: 0,
    })

    expect(effect.isBlockingFlow).toBe(true)
    expect(effect.flowMultiplier).toBeCloseTo(0.1)
  })

  it('clamps negative obstacle strength to zero', () => {
    const effect = getObstacleEffect({
      waterLevel: 50,
      elapsedTime: 0,
      mode: 'fixed',
      strength: -1,
      positions: [50],
      movementSpeed: 0,
    })

    expect(effect.isBlockingFlow).toBe(true)
    expect(effect.flowMultiplier).toBe(1)
  })

  it('moves a moving obstacle over time', () => {
    const firstEffect = getObstacleEffect({
      waterLevel: 0,
      elapsedTime: 0,
      mode: 'moving',
      strength: 0.55,
      positions: [52],
      movementSpeed: 3,
    })

    const laterEffect = getObstacleEffect({
      waterLevel: 0,
      elapsedTime: 0.5,
      mode: 'moving',
      strength: 0.55,
      positions: [52],
      movementSpeed: 3,
    })

    expect(firstEffect.activePositions).toHaveLength(1)
    expect(laterEffect.activePositions).toHaveLength(1)

    expect(
      laterEffect.activePositions[0],
    ).not.toBeCloseTo(
      firstEffect.activePositions[0],
    )
  })

  it('keeps a moving obstacle inside the playable 15 to 85 percent range', () => {
    const effect = getObstacleEffect({
      waterLevel: 0,
      elapsedTime: 100,
      mode: 'moving',
      strength: 0.55,
      positions: [80],
      movementSpeed: 4.2,
    })

    expect(effect.activePositions[0]).toBeGreaterThanOrEqual(15)
    expect(effect.activePositions[0]).toBeLessThanOrEqual(85)
  })

  it('disrupts the flow when the water meets a moving obstacle', () => {
    const effect = getObstacleEffect({
      waterLevel: 52,
      elapsedTime: 0,
      mode: 'moving',
      strength: 0.55,
      positions: [52],
      movementSpeed: 3,
    })

    expect(effect.isBlockingFlow).toBe(true)
    expect(effect.flowMultiplier).toBeCloseTo(0.45)
  })

  it('uses a default obstacle position when no fixed position is provided', () => {
    const effect = getObstacleEffect({
      waterLevel: 50,
      elapsedTime: 0,
      mode: 'fixed',
      strength: 0.4,
      positions: [],
      movementSpeed: 0,
    })

    expect(effect.activePositions).toEqual([50])
    expect(effect.isBlockingFlow).toBe(true)
    expect(effect.flowMultiplier).toBeCloseTo(0.6)
  })
})