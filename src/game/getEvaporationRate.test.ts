import { describe, expect, it } from 'vitest'
import { getEvaporationRate } from './getEvaporationRate'

describe('getEvaporationRate', () => {
  it('preserves the base rate at the initial temperature', () => {
    expect(getEvaporationRate({ baseRate: 3.4, currentTemperature: 76, initialTemperature: 76 })).toBeCloseTo(3.4)
  })

  it('decreases proportionally as temperature falls', () => {
    expect(getEvaporationRate({ baseRate: 4, currentTemperature: 40, initialTemperature: 80 })).toBeCloseTo(2)
  })

  it('increases proportionally if temperature rises', () => {
    expect(getEvaporationRate({ baseRate: 3, currentTemperature: 90, initialTemperature: 60 })).toBeCloseTo(4.5)
  })

  it.each([
    { baseRate: 0, currentTemperature: 70, initialTemperature: 70 },
    { baseRate: -2, currentTemperature: 70, initialTemperature: 70 },
    { baseRate: 2, currentTemperature: 0, initialTemperature: 70 },
    { baseRate: 2, currentTemperature: -10, initialTemperature: 70 },
    { baseRate: 2, currentTemperature: 70, initialTemperature: 0 },
    { baseRate: 2, currentTemperature: 70, initialTemperature: -10 },
  ])('returns zero for non-positive input: %j', (params) => {
    expect(getEvaporationRate(params)).toBe(0)
  })
})
