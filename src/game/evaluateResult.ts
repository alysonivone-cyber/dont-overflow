import type { GameResult, LevelConfig } from './types'

export function evaluateResult(
  waterLevel: number,
  level: LevelConfig,
): GameResult {
  const minimum = level.target - level.tolerance
  const maximum = level.target + level.tolerance

  if (waterLevel < minimum) {
    return 'TOO LOW'
  }

  if (waterLevel > maximum) {
    return 'OVERFLOW'
  }

  // Exactement la valeur cible après arrondi :
  // réussite parfaite.
  if (Math.round(waterLevel) === level.target) {
    return 'PERFECT'
  }

  // Dans la zone cible mais pas exactement au centre :
  // le niveau est quand même réussi.
  return 'SUCCESS'
}