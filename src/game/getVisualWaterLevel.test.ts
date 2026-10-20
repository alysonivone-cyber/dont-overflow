import { describe, expect, it } from 'vitest'
import { getVisualWaterLevel } from './getVisualWaterLevel'

describe('getVisualWaterLevel', () => {
  it.each(['straight', 'wide', 'conical', 'martini'] as const)('clamps %s shape to the visual 0–100 range', (shape) => {
    expect(getVisualWaterLevel(-15, shape)).toBe(0)
    expect(getVisualWaterLevel(0, shape)).toBe(0)
    expect(getVisualWaterLevel(100, shape)).toBe(100)
    expect(getVisualWaterLevel(180, shape)).toBe(100)
  })

  it('shows the real percentage in a straight glass', () => {
    expect(getVisualWaterLevel(50, 'straight')).toBe(50)
  })

  it('uses the correct nonlinear visual proportions', () => {
    expect(getVisualWaterLevel(50, 'wide')).toBeCloseTo(Math.pow(0.5, 1.2) * 100)
    expect(getVisualWaterLevel(50, 'conical')).toBeCloseTo(Math.pow(0.5, 1.45) * 100)
    expect(getVisualWaterLevel(50, 'martini')).toBeCloseTo(Math.pow(0.5, 1.75) * 100)
  })

  it('makes the same 50% fill look progressively lower in narrower shapes', () => {
    const straight = getVisualWaterLevel(50, 'straight')
    const wide = getVisualWaterLevel(50, 'wide')
    const conical = getVisualWaterLevel(50, 'conical')
    const martini = getVisualWaterLevel(50, 'martini')
    expect(straight).toBeGreaterThan(wide)
    expect(wide).toBeGreaterThan(conical)
    expect(conical).toBeGreaterThan(martini)
  })
})
