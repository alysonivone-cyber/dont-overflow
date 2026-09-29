import type { ContainerShape } from './types'

/**
 * Converts the REAL water level used by the Game State
 * into the VISUAL water height shown to the player.
 *
 * Important:
 * - waterLevel remains the source of truth.
 * - this function only changes perception/rendering.
 * - evaluateResult() must always receive the real waterLevel.
 */
export function getVisualWaterLevel(
  waterLevel: number,
  containerShape: ContainerShape,
): number {
  // Keep the value inside the playable visual range.
  const normalizedLevel = Math.min(
    Math.max(waterLevel, 0),
    100,
  )

  const ratio = normalizedLevel / 100

  switch (containerShape) {
    // =====================================================
    // STRAIGHT
    // =====================================================
    //
    // World 1.
    // Visual height = real fill percentage.
    //
    // 50% real water -> 50% visual height.
    //
    case 'straight':
      return normalizedLevel

    // =====================================================
    // WIDE
    // =====================================================
    //
    // First gentle perception challenge.
    //
    // The visual level rises slightly more slowly
    // than the real Game State.
    //
    // Example:
    // 50% real -> about 44% visual.
    //
    case 'wide':
      return Math.pow(ratio, 1.2) * 100

    // =====================================================
    // CONICAL
    // =====================================================
    //
    // Stronger non-linear relationship.
    //
    // The player can no longer assume that
    // half the visual height means half the volume.
    //
    case 'conical':
      return Math.pow(ratio, 1.45) * 100

    // =====================================================
    // MARTINI
    // =====================================================
    //
    // Strongest perception challenge in World 2.
    //
    // The visual height differs significantly
    // from the real fill percentage.
    //
    case 'martini':
      return Math.pow(ratio, 1.75) * 100

    default:
      return normalizedLevel
  }
}