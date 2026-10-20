
import { getFlowSpeed } from './getFlowSpeed'
import { getObstacleEffect } from './getObstacleEffect'
import type { FlowType, ObstacleMode } from './types'

interface EffectiveFlowSpeedParams {
  baseSpeed: number
  flowType: FlowType
  waterLevel: number
  elapsedTime: number
  hasObstacles: boolean
  obstacleMode: ObstacleMode
  obstacleStrength: number
  obstaclePositions: number[]
  obstacleMovementSpeed: number
  survivorFlowMultiplier?: number
  swampSurprise?: boolean
}

export function getEffectiveFlowSpeed({
  baseSpeed,
  flowType,
  waterLevel,
  elapsedTime,
  hasObstacles,
  obstacleMode,
  obstacleStrength,
  obstaclePositions,
  obstacleMovementSpeed,
  survivorFlowMultiplier = 1,
  swampSurprise = false,
}: EffectiveFlowSpeedParams): number {
  const normalSpeed = getFlowSpeed({
    baseSpeed,
    flowType,
    waterLevel,
    elapsedTime,
  })

  const flowSpeed = swampSurprise
    ? elapsedTime < 0.85
      ? 12
      : 95
    : normalSpeed

  const obstacleMultiplier = hasObstacles
    ? getObstacleEffect({
        waterLevel,
        elapsedTime,
        mode: obstacleMode,
        strength: obstacleStrength,
        positions: obstaclePositions,
        movementSpeed: obstacleMovementSpeed,
      }).flowMultiplier
    : 1

  return (
    flowSpeed *
    obstacleMultiplier *
    survivorFlowMultiplier
  )
}
