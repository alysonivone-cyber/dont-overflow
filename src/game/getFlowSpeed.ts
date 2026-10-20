
import type { FlowType } from './types'

interface GetFlowSpeedParams {
  baseSpeed: number
  flowType: FlowType
  waterLevel: number
  elapsedTime: number
}

export function getFlowSpeed({
  baseSpeed,
  flowType,
  waterLevel,
  elapsedTime,
}: GetFlowSpeedParams): number {
  switch (flowType) {
    // =====================================================
    // CONSTANT — Unchanged
    // =====================================================

    case 'constant':
      return baseSpeed

    // =====================================================
    // ACCELERATING — Dramatic progressive acceleration
    // =====================================================

    case 'accelerating': {
  const progress = Math.max(
    0,
    Math.min(waterLevel / 100, 1),
  )

  // WORLD 3.2 — SURPRISE ACCELERATION
  // The player initially feels safe.
  // Suddenly, the water becomes much faster.

  if (baseSpeed === 36) {
    if (progress < 0.30) {
      return baseSpeed * 0.65
    }

    if (progress < 0.48) {
      return baseSpeed * 1.15
    }

    if (progress < 0.62) {
      return baseSpeed * 2.5
    }

    return baseSpeed * 4
  }

  // Default acceleration for other levels.
  const acceleration =
    1 + 2 * progress * progress

  return baseSpeed * acceleration
}

    // =====================================================
    // VARIABLE — Strong acceleration and deceleration
    // =====================================================

    case 'variable': {
      // Predictable oscillation with dramatic changes.
      // Speed ranges from 0.15x to 2.20x.
      //
      // 0.15x = very slow
      // 2.20x = very fast

      const wave = Math.sin(elapsedTime * 3.5)

      const normalizedWave = (wave + 1) / 2

      const multiplier =
        0.15 + normalizedWave * 2.05

      return baseSpeed * multiplier
    }

  // =====================================================
// SHOCK — World 3.1 surprise acceleration
// =====================================================

case 'shock': {
  if (elapsedTime < 0.8) {
    return 5
  }

  if (elapsedTime < 1.2) {
    return 20
  }

  if (elapsedTime < 1.6) {
    return 160
  }

  return 220
}

    default:
      return baseSpeed
  }
}
