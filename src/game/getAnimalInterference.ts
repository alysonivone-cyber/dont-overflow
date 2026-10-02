import type { FrogMode } from './types'

// =====================================================
// WORLD 8 — FROG INVASION
// =====================================================

interface GetFrogInterferenceParams {
  mode: FrogMode
  elapsedTime: number
  triggerTimes: number[]
  displacement: number
  exitDisplacement: number
  obstruction: number
  shakeStrength: number
}

export interface FrogInterference {
  // Number of frog events that should already have happened.
  triggeredEvents: number

  // Total water displacement caused by the frogs.
  waterOffset: number

  // Number of frogs currently visible inside the glass.
  frogsInGlass: number

  // Visual obstruction percentage.
  visualObstruction: number

  // Extra movement applied to the glass.
  glassOffsetX: number
  glassOffsetY: number
  glassRotation: number

  // True while World 8 is actively disturbing the player.
  isActive: boolean
}

export function getAnimalInterference({
  mode,
  elapsedTime,
  triggerTimes,
  displacement,
  exitDisplacement,
  obstruction,
  shakeStrength,
}: GetFrogInterferenceParams): FrogInterference {
  const safeTime = Math.max(0, elapsedTime)

  const safeTriggerTimes = triggerTimes
    .map((time) => Math.max(0, time))
    .sort((a, b) => a - b)

  const safeDisplacement = Math.max(0, displacement)
  const safeExitDisplacement = Math.max(
    0,
    exitDisplacement,
  )
  const safeObstruction = Math.max(
    0,
    Math.min(obstruction, 100),
  )
  const safeShakeStrength = Math.max(
    0,
    Math.min(shakeStrength, 40),
  )

  const triggeredEvents = safeTriggerTimes.filter(
    (time) => safeTime >= time,
  ).length

  let waterOffset = 0
  let frogsInGlass = 0

  // ---------------------------------------------------
  // 8.1 — SINGLE FROG
  // ---------------------------------------------------

  if (mode === 'single') {
    if (triggeredEvents >= 1) {
      waterOffset = safeDisplacement
      frogsInGlass = 1
    }
  }

  // ---------------------------------------------------
  // 8.2 — DOUBLE FROG
  // ---------------------------------------------------

  if (mode === 'double') {
    const frogCount = Math.min(triggeredEvents, 2)

    waterOffset =
      frogCount * safeDisplacement

    frogsInGlass = frogCount
  }

  // ---------------------------------------------------
  // 8.3 — FROG JUMPS IN, THEN OUT
  // ---------------------------------------------------

  if (mode === 'in-out') {
    if (triggeredEvents === 1) {
      waterOffset = safeDisplacement
      frogsInGlass = 1
    }

    if (triggeredEvents >= 2) {
      waterOffset =
        safeDisplacement -
        safeExitDisplacement

      frogsInGlass = 0
    }
  }

  // ---------------------------------------------------
  // 8.4 — FROG INVASION
  // ---------------------------------------------------

  if (mode === 'invasion') {
    frogsInGlass = triggeredEvents

    waterOffset =
      triggeredEvents *
      safeDisplacement
  }

  // ---------------------------------------------------
  // 8.5 — FROG APOCALYPSE
  // ---------------------------------------------------

  if (mode === 'apocalypse') {
    frogsInGlass = triggeredEvents

    waterOffset =
      triggeredEvents *
      safeDisplacement
  }

  // ---------------------------------------------------
  // VISUAL OBSTRUCTION
  // ---------------------------------------------------

  const visualObstruction =
    frogsInGlass > 0 &&
    (
      mode === 'invasion' ||
      mode === 'apocalypse'
    )
      ? safeObstruction
      : 0

  // ---------------------------------------------------
  // GLASS SHAKE
  // Only Frog Apocalypse uses this for now.
  // ---------------------------------------------------

  const shouldShake =
    mode === 'apocalypse' &&
    frogsInGlass > 0 &&
    safeShakeStrength > 0

  const glassOffsetX = shouldShake
    ? Math.sin(safeTime * 18) *
      safeShakeStrength
    : 0

  const glassOffsetY = shouldShake
    ? Math.cos(safeTime * 15) *
      safeShakeStrength *
      0.25
    : 0

  const glassRotation = shouldShake
    ? Math.sin(safeTime * 20) *
      Math.min(
        safeShakeStrength * 0.4,
        8,
      )
    : 0

  return {
    triggeredEvents,
    waterOffset,
    frogsInGlass,
    visualObstruction,
    glassOffsetX,
    glassOffsetY,
    glassRotation,
    isActive: triggeredEvents > 0,
  }
}