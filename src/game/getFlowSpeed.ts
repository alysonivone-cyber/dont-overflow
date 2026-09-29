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
    // CONSTANT
    // =====================================================

    case 'constant':
      return baseSpeed

    // =====================================================
    // ACCELERATING
    // =====================================================
    //
    // The flow progressively becomes faster as
    // the container fills.
    //
    // Example:
    // baseSpeed = 30
    //
    // empty container  -> 30
    // 50% full         -> 37.5
    // 100% full        -> 45
    //
    case 'accelerating': {
      const acceleration =
        1 + (waterLevel / 100) * 0.5

      return baseSpeed * acceleration
    }

    // =====================================================
    // VARIABLE
    // =====================================================
    //
    // The flow changes rhythm over time.
    //
    // Math.sin() gives us a smooth oscillation instead
    // of completely random behaviour.
    //
    // This is important:
    // the challenge remains difficult but predictable.
    //
    case 'variable': {
      const variation =
        1 + Math.sin(elapsedTime * 4) * 0.35

      return baseSpeed * variation
    }

    default:
      return baseSpeed
  }
}