import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  getContainerMotion,
} from './getContainerMotion'

describe('getContainerMotion', () => {
  it('starts horizontal motion from the center', () => {
    const motion = getContainerMotion({
      elapsedTime: 0,
      mode: 'horizontal',
      amplitude: 20,
      speed: 2,
    })

    expect(motion.x).toBeCloseTo(0)
    expect(motion.y).toBe(0)
    expect(motion.rotation).toBe(0)
  })

  it('moves horizontally over time', () => {
    const motion = getContainerMotion({
      elapsedTime: 0.5,
      mode: 'horizontal',
      amplitude: 20,
      speed: 2,
    })

    expect(
      Math.abs(motion.x),
    ).toBeGreaterThan(0)

    expect(motion.y).toBe(0)
  })

  it('adds rotation in pendulum mode', () => {
    const motion = getContainerMotion({
      elapsedTime: 0.5,
      mode: 'pendulum',
      amplitude: 20,
      speed: 2,
    })

    expect(
      Math.abs(motion.x),
    ).toBeGreaterThan(0)

    expect(
      Math.abs(motion.rotation),
    ).toBeGreaterThan(0)
  })

  it('moves only vertically in vertical mode', () => {
    const motion = getContainerMotion({
      elapsedTime: 0.5,
      mode: 'vertical',
      amplitude: 20,
      speed: 2,
    })

    expect(motion.x).toBe(0)

    expect(
      Math.abs(motion.y),
    ).toBeGreaterThan(0)

    expect(motion.rotation).toBe(0)
  })

  it('combines horizontal vertical and rotational movement', () => {
    const motion = getContainerMotion({
      elapsedTime: 0.5,
      mode: 'combined',
      amplitude: 20,
      speed: 2,
    })

    expect(
      Math.abs(motion.x),
    ).toBeGreaterThan(0)

    expect(
      Math.abs(motion.y),
    ).toBeGreaterThan(0)

    expect(
      Math.abs(motion.rotation),
    ).toBeGreaterThan(0)
  })

  it('clamps excessive amplitude', () => {
    const motion = getContainerMotion({
      elapsedTime: Math.PI / 2,
      mode: 'horizontal',
      amplitude: 500,
      speed: 1,
    })

    expect(
      Math.abs(motion.x),
    ).toBeLessThanOrEqual(40)
  })

  it('prevents negative amplitude and speed', () => {
    const motion = getContainerMotion({
      elapsedTime: 1,
      mode: 'horizontal',
      amplitude: -20,
      speed: -2,
    })

    expect(motion.x).toBe(0)
    expect(motion.y).toBe(0)
    expect(motion.rotation).toBe(0)
  })
})