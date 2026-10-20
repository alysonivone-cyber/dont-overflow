import { describe, expect, it } from 'vitest'
import { getFlowSpeed } from './getFlowSpeed'

describe('getFlowSpeed', () => {
  it('keeps constant flow unchanged', () => {
    expect(getFlowSpeed({ baseSpeed: 32, flowType: 'constant', waterLevel: 80, elapsedTime: 10 })).toBe(32)
  })

  it('accelerates normally with water level', () => {
    expect(getFlowSpeed({ baseSpeed: 20, flowType: 'accelerating', waterLevel: 0, elapsedTime: 0 })).toBe(20)
    expect(getFlowSpeed({ baseSpeed: 20, flowType: 'accelerating', waterLevel: 50, elapsedTime: 0 })).toBe(30)
    expect(getFlowSpeed({ baseSpeed: 20, flowType: 'accelerating', waterLevel: 100, elapsedTime: 0 })).toBe(60)
  })

  it('clamps normal acceleration at 0% and 100%', () => {
    expect(getFlowSpeed({ baseSpeed: 20, flowType: 'accelerating', waterLevel: -20, elapsedTime: 0 })).toBe(20)
    expect(getFlowSpeed({ baseSpeed: 20, flowType: 'accelerating', waterLevel: 150, elapsedTime: 0 })).toBe(60)
  })

  it.each([
    [0, 36 * 0.65],
    [30, 36 * 1.15],
    [48, 36 * 2.5],
    [62, 36 * 4],
  ])('uses the special acceleration for base speed 36 at %s%%', (waterLevel, expected) => {
    expect(getFlowSpeed({ baseSpeed: 36, flowType: 'accelerating', waterLevel, elapsedTime: 0 })).toBeCloseTo(expected)
  })

  it('oscillates predictably in variable mode', () => {
    expect(getFlowSpeed({ baseSpeed: 20, flowType: 'variable', waterLevel: 50, elapsedTime: 0 })).toBeCloseTo(23.5)
    expect(getFlowSpeed({ baseSpeed: 20, flowType: 'variable', waterLevel: 50, elapsedTime: Math.PI / 7 })).toBeCloseTo(44)
    expect(getFlowSpeed({ baseSpeed: 20, flowType: 'variable', waterLevel: 50, elapsedTime: -Math.PI / 7 })).toBeCloseTo(3)
  })

  it.each([
    [0, 5],
    [0.8, 20],
    [1.2, 160],
    [1.6, 220],
  ])('uses shock flow at elapsed time %s', (elapsedTime, expected) => {
    expect(getFlowSpeed({ baseSpeed: 30, flowType: 'shock', waterLevel: 50, elapsedTime })).toBe(expected)
  })
})
