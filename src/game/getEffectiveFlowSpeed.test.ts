
import { describe, expect, it } from 'vitest'
import { getEffectiveFlowSpeed } from './getEffectiveFlowSpeed'

const baseParams = {
  baseSpeed: 40,
  flowType: 'constant' as const,
  waterLevel: 50,
  elapsedTime: 0,
  hasObstacles: false,
  obstacleMode: 'fixed' as const,
  obstacleStrength: 0,
  obstaclePositions: [],
  obstacleMovementSpeed: 0,
}

describe('getEffectiveFlowSpeed', () => {
  it('preserves normal constant flow', () => {
    expect(getEffectiveFlowSpeed(baseParams)).toBe(40)
  })

  it('applies the survivor multiplier', () => {
    expect(
      getEffectiveFlowSpeed({
        ...baseParams,
        survivorFlowMultiplier: 0.5,
      }),
    ).toBe(20)
  })

  it('applies obstacle resistance', () => {
    expect(
      getEffectiveFlowSpeed({
        ...baseParams,
        hasObstacles: true,
        obstacleStrength: 0.5,
        obstaclePositions: [50],
      }),
    ).toBe(20)
  })

  it('preserves the slow opening of world 14-1', () => {
    expect(
      getEffectiveFlowSpeed({
        ...baseParams,
        swampSurprise: true,
        elapsedTime: 0.5,
      }),
    ).toBe(12)
  })

  it('preserves the sudden acceleration of world 14-1', () => {
    expect(
      getEffectiveFlowSpeed({
        ...baseParams,
        swampSurprise: true,
        elapsedTime: 0.85,
      }),
    ).toBe(95)
  })

  it('combines obstacles and survivor pressure', () => {
    expect(
      getEffectiveFlowSpeed({
        ...baseParams,
        hasObstacles: true,
        obstacleStrength: 0.5,
        obstaclePositions: [50],
        survivorFlowMultiplier: 0.5,
      }),
    ).toBe(10)
  })
})