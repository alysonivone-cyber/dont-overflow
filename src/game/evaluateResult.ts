
import type { GameResult, LevelConfig } from './types'

export function evaluateResult(
  waterLevel: number,
  level: LevelConfig,
): GameResult {
  const minimum = level.target - level.tolerance
  const maximum = level.target + level.tolerance

  // Use the same rounded percentage as the player sees.
  // Keep the original waterLevel for game physics.
  const evaluatedLevel = Math.round(waterLevel)

  if (evaluatedLevel < minimum) {
    return 'TOO LOW'
  }

  if (evaluatedLevel > maximum) {
    return 'OVERFLOW'
  }

  if (evaluatedLevel === level.target) {
    return 'PERFECT'
  }

  return 'SUCCESS'
}
