import type { ObstacleMode } from './types'

interface GetObstacleEffectParams {
  waterLevel: number
  elapsedTime: number
  mode: ObstacleMode
  strength: number
  positions: number[]
  movementSpeed: number
}

export interface ObstacleEffect {
  flowMultiplier: number
  activePositions: number[]
  isBlockingFlow: boolean
}

export function getObstacleEffect({
  waterLevel,
  elapsedTime,
  mode,
  strength,
  positions,
  movementSpeed,
}: GetObstacleEffectParams): ObstacleEffect {
  const safeStrength = Math.max(
    0,
    Math.min(strength, 0.9),
  )

  // -----------------------------------------------------
  // MOVING OBSTACLE
  // -----------------------------------------------------

  if (mode === 'moving') {
    const basePosition =
      positions[0] ?? 50

    const movement =
      Math.sin(
        elapsedTime * movementSpeed,
      ) * 18

    const movingPosition =
      Math.max(
        15,
        Math.min(
          basePosition + movement,
          85,
        ),
      )

    const distance =
      Math.abs(
        waterLevel - movingPosition,
      )

    const isBlockingFlow =
      distance <= 8

    return {
      flowMultiplier:
        isBlockingFlow
          ? 1 - safeStrength
          : 1,

      activePositions: [
        movingPosition,
      ],

      isBlockingFlow,
    }
  }

  // -----------------------------------------------------
  // FIXED / DOUBLE / BLIND OBSTACLES
  // -----------------------------------------------------

  const activePositions =
    positions.length > 0
      ? positions
      : [50]

  const isBlockingFlow =
    activePositions.some(
      (position) =>
        Math.abs(
          waterLevel - position,
        ) <= 7,
    )

  return {
    flowMultiplier:
      isBlockingFlow
        ? 1 - safeStrength
        : 1,

    activePositions,

    isBlockingFlow,
  }
}