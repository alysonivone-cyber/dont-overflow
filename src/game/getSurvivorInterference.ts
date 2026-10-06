import type {
  SurvivorMode,
} from './types'

interface SurvivorInterferenceInput {
  mode: SurvivorMode
  elapsedTime: number
  triggerTimes: number[]

  shakeStrength: number
  blackoutDuration: number
  pressureStrength: number
}

export interface SurvivorInterference {
  triggeredEvents: number

  glassOffsetX: number
  glassOffsetY: number
  glassRotation: number

  flowMultiplier: number

  blackoutOpacity: number

  isShaking: boolean
  isBlackout: boolean
  isPressureActive: boolean
  isActive: boolean
}

export function getSurvivorInterference({
  mode,
  elapsedTime,
  triggerTimes,
  shakeStrength,
  blackoutDuration,
  pressureStrength,
}: SurvivorInterferenceInput): SurvivorInterference {
  const triggeredEvents =
    triggerTimes.filter(
      (time) => elapsedTime >= time,
    ).length

  let glassOffsetX = 0
  let glassOffsetY = 0
  let glassRotation = 0

  let flowMultiplier = 1

  let blackoutOpacity = 0

  let isShaking = false
  let isBlackout = false
  let isPressureActive = false

  const latestTrigger =
    triggeredEvents > 0
      ? triggerTimes[
          triggeredEvents - 1
        ]
      : null

  const timeSinceTrigger =
    latestTrigger !== null
      ? elapsedTime - latestTrigger
      : Infinity

  // =====================================================
  // AFTERSHOCK
  // =====================================================

  if (
    mode === 'aftershock' &&
    timeSinceTrigger >= 0 &&
    timeSinceTrigger <= 0.65
  ) {
    isShaking = true

    const intensity =
      1 - timeSinceTrigger / 0.65

    glassOffsetX =
      Math.sin(
        elapsedTime * 42,
      ) *
      shakeStrength *
      intensity

    glassOffsetY =
      Math.cos(
        elapsedTime * 35,
      ) *
      shakeStrength *
      0.35 *
      intensity

    glassRotation =
      Math.sin(
        elapsedTime * 38,
      ) *
      shakeStrength *
      0.12 *
      intensity
  }

  // =====================================================
  // PRESSURE
  // =====================================================

  if (
    mode === 'pressure' &&
    timeSinceTrigger >= 0 &&
    timeSinceTrigger <= 0.8
  ) {
    isPressureActive = true

    flowMultiplier =
      1 + pressureStrength
  }

  // =====================================================
  // BLACKOUT
  // =====================================================

  if (
    mode === 'blackout' &&
    timeSinceTrigger >= 0 &&
    timeSinceTrigger <=
      blackoutDuration
  ) {
    isBlackout = true

    const halfDuration =
      blackoutDuration / 2

    if (
      timeSinceTrigger <=
      halfDuration
    ) {
      blackoutOpacity =
        0.82 *
        (timeSinceTrigger /
          halfDuration)
    } else {
      blackoutOpacity =
        0.82 *
        (1 -
          (timeSinceTrigger -
            halfDuration) /
            halfDuration)
    }

    blackoutOpacity =
      Math.max(
        0,
        Math.min(
          blackoutOpacity,
          0.82,
        ),
      )
  }

  // =====================================================
  // CRITICAL
  // =====================================================

  if (mode === 'critical') {
    const eventType =
      Math.max(
        triggeredEvents - 1,
        0,
      ) % 3

    if (
      triggeredEvents > 0 &&
      eventType === 0 &&
      timeSinceTrigger <= 0.55
    ) {
      isShaking = true

      const intensity =
        1 -
        timeSinceTrigger / 0.55

      glassOffsetX =
        Math.sin(
          elapsedTime * 45,
        ) *
        shakeStrength *
        intensity

      glassRotation =
        Math.sin(
          elapsedTime * 40,
        ) *
        shakeStrength *
        0.1 *
        intensity
    }

    if (
      triggeredEvents > 0 &&
      eventType === 1 &&
      timeSinceTrigger <= 0.7
    ) {
      isPressureActive = true

      flowMultiplier =
        1 + pressureStrength
    }

    if (
      triggeredEvents > 0 &&
      eventType === 2 &&
      timeSinceTrigger <=
        blackoutDuration
    ) {
      isBlackout = true

      blackoutOpacity = 0.68
    }
  }

  // =====================================================
  // SURVIVAL — FINAL MODE
  // =====================================================

  if (mode === 'survival') {
    const eventType =
      Math.max(
        triggeredEvents - 1,
        0,
      ) % 3

    if (
      triggeredEvents > 0 &&
      eventType === 0 &&
      timeSinceTrigger <= 0.5
    ) {
      isShaking = true

      const intensity =
        1 -
        timeSinceTrigger / 0.5

      glassOffsetX =
        Math.sin(
          elapsedTime * 50,
        ) *
        shakeStrength *
        intensity

      glassOffsetY =
        Math.cos(
          elapsedTime * 44,
        ) *
        shakeStrength *
        0.25 *
        intensity

      glassRotation =
        Math.sin(
          elapsedTime * 46,
        ) *
        shakeStrength *
        0.12 *
        intensity
    }

    if (
      triggeredEvents > 0 &&
      eventType === 1 &&
      timeSinceTrigger <= 0.65
    ) {
      isPressureActive = true

      flowMultiplier =
        1 + pressureStrength
    }

    if (
      triggeredEvents > 0 &&
      eventType === 2 &&
      timeSinceTrigger <=
        blackoutDuration
    ) {
      isBlackout = true

      blackoutOpacity = 0.72
    }
  }

  return {
    triggeredEvents,

    glassOffsetX,
    glassOffsetY,
    glassRotation,

    flowMultiplier,

    blackoutOpacity,

    isShaking,
    isBlackout,
    isPressureActive,

    isActive:
      isShaking ||
      isBlackout ||
      isPressureActive,
  }
}