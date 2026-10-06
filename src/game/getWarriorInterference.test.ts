import { describe, expect, it } from 'vitest'

import { getWarriorInterference } from './getWarriorInterference'

describe('getWarriorInterference', () => {
  it('does nothing before the first trigger', () => {
    const result =
      getWarriorInterference({
        mode: 'crossing',
        elapsedTime: 0.5,
        triggerTimes: [1],
        pushStrength: 20,
        hideDuration: 1,
        obstruction: 40,
      })

    expect(result.isActive).toBe(false)
    expect(result.isWarriorVisible).toBe(false)
    expect(result.visualObstruction).toBe(0)
  })

  it('activates crossing after its trigger', () => {
    const result =
      getWarriorInterference({
        mode: 'crossing',
        elapsedTime: 1.4,
        triggerTimes: [1],
        pushStrength: 20,
        hideDuration: 1,
        obstruction: 45,
      })

    expect(result.isActive).toBe(true)
    expect(result.isWarriorVisible).toBe(true)
    expect(result.visualObstruction).toBe(45)
  })

  it('ends crossing after its duration', () => {
    const result =
      getWarriorInterference({
        mode: 'crossing',
        elapsedTime: 2.5,
        triggerTimes: [1],
        pushStrength: 20,
        hideDuration: 1,
        obstruction: 45,
      })

    expect(result.isActive).toBe(false)
    expect(result.isWarriorVisible).toBe(false)
  })

  it('pushes the glass after a push trigger', () => {
    const result =
      getWarriorInterference({
        mode: 'push',
        elapsedTime: 1,
        triggerTimes: [1],
        pushStrength: 24,
        hideDuration: 1,
        obstruction: 0,
      })

    expect(result.isActive).toBe(true)
    expect(result.glassOffsetX).toBe(24)
    expect(result.glassRotation).toBe(6)
  })

  it('reduces push strength as the event progresses', () => {
    const beginning =
      getWarriorInterference({
        mode: 'push',
        elapsedTime: 1,
        triggerTimes: [1],
        pushStrength: 20,
        hideDuration: 1,
        obstruction: 0,
      })

    const later =
      getWarriorInterference({
        mode: 'push',
        elapsedTime: 1.3,
        triggerTimes: [1],
        pushStrength: 20,
        hideDuration: 1,
        obstruction: 0,
      })

    expect(
      Math.abs(later.glassOffsetX),
    ).toBeLessThan(
      Math.abs(beginning.glassOffsetX),
    )
  })

  it('temporarily hides the glass in steal mode', () => {
    const result =
      getWarriorInterference({
        mode: 'steal',
        elapsedTime: 1.4,
        triggerTimes: [1],
        pushStrength: 0,
        hideDuration: 1,
        obstruction: 0,
      })

    expect(result.isActive).toBe(true)
    expect(result.isGlassHidden).toBe(true)
    expect(result.isWarriorVisible).toBe(true)
  })

  it('returns the glass after steal duration', () => {
    const result =
      getWarriorInterference({
        mode: 'steal',
        elapsedTime: 2.2,
        triggerTimes: [1],
        pushStrength: 0,
        hideDuration: 1,
        obstruction: 0,
      })

    expect(result.isGlassHidden).toBe(false)
    expect(result.isActive).toBe(false)
  })

  it('creates visual obstruction in obstruction mode', () => {
    const result =
      getWarriorInterference({
        mode: 'obstruction',
        elapsedTime: 1.5,
        triggerTimes: [1],
        pushStrength: 0,
        hideDuration: 2,
        obstruction: 60,
      })

    expect(result.isActive).toBe(true)
    expect(result.visualObstruction).toBe(60)
  })

  it('changes behaviour between war-zone triggers', () => {
    const crossing =
      getWarriorInterference({
        mode: 'war-zone',
        elapsedTime: 1,
        triggerTimes: [1, 2, 3, 4],
        pushStrength: 20,
        hideDuration: 1,
        obstruction: 50,
      })

    const push =
      getWarriorInterference({
        mode: 'war-zone',
        elapsedTime: 2,
        triggerTimes: [1, 2, 3, 4],
        pushStrength: 20,
        hideDuration: 1,
        obstruction: 50,
      })

    const steal =
      getWarriorInterference({
        mode: 'war-zone',
        elapsedTime: 3,
        triggerTimes: [1, 2, 3, 4],
        pushStrength: 20,
        hideDuration: 1,
        obstruction: 50,
      })

    expect(crossing.visualObstruction).toBe(50)
    expect(push.glassOffsetX).not.toBe(0)
    expect(steal.isGlassHidden).toBe(true)
  })

  it('tracks the number of triggered warrior events', () => {
    const result =
      getWarriorInterference({
        mode: 'war-zone',
        elapsedTime: 2.5,
        triggerTimes: [0.5, 1.5, 3],
        pushStrength: 20,
        hideDuration: 1,
        obstruction: 40,
      })

    expect(result.triggeredEvents).toBe(2)
  })
})