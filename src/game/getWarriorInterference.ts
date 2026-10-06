import type { WarriorMode } from './types'

interface WarriorInterferenceInput {
  mode: WarriorMode
  elapsedTime: number
  triggerTimes: number[]
  pushStrength: number
  hideDuration: number
  obstruction: number
}

export interface WarriorInterferenceResult {
  triggeredEvents: number

  glassOffsetX: number
  glassOffsetY: number
  glassRotation: number

  visualObstruction: number

  isGlassHidden: boolean
  isWarriorVisible: boolean

  warriorProgress: number
  isActive: boolean
}

export function getWarriorInterference({
  mode,
  elapsedTime,
  triggerTimes,
  pushStrength,
  hideDuration,
  obstruction,
}: WarriorInterferenceInput): WarriorInterferenceResult {
  const triggeredEvents =
    triggerTimes.filter(
      (time) => elapsedTime >= time,
    ).length

  const emptyResult: WarriorInterferenceResult = {
    triggeredEvents,

    glassOffsetX: 0,
    glassOffsetY: 0,
    glassRotation: 0,

    visualObstruction: 0,

    isGlassHidden: false,
    isWarriorVisible: false,

    warriorProgress: 0,
    isActive: false,
  }

  if (
    triggerTimes.length === 0 ||
    triggeredEvents === 0
  ) {
    return emptyResult
  }

  const latestTriggerIndex =
    Math.min(
      triggeredEvents - 1,
      triggerTimes.length - 1,
    )

  const latestTrigger =
    triggerTimes[latestTriggerIndex]

  const timeSinceTrigger =
    Math.max(
      elapsedTime - latestTrigger,
      0,
    )

  // =====================================================
  // 11.1 — CROSSING
  // A warrior crosses in front of the play area.
  // =====================================================

  if (mode === 'crossing') {
    const duration = 1.2

    if (timeSinceTrigger > duration) {
      return emptyResult
    }

    const progress =
      Math.min(
        timeSinceTrigger / duration,
        1,
      )

    return {
      ...emptyResult,

      isWarriorVisible: true,

      warriorProgress: progress,

      visualObstruction:
        obstruction,

      isActive: true,
    }
  }

  // =====================================================
  // 11.2 — PUSH
  // A sudden hit pushes and tilts the glass.
  // =====================================================

  if (mode === 'push') {
    const duration = 0.65

    if (timeSinceTrigger > duration) {
      return emptyResult
    }

    const progress =
      Math.min(
        timeSinceTrigger / duration,
        1,
      )

    const intensity =
      1 - progress

    const direction =
      latestTriggerIndex % 2 === 0
        ? 1
        : -1

    return {
      ...emptyResult,

      glassOffsetX:
        pushStrength *
        intensity *
        direction,

      glassRotation:
        pushStrength *
        0.25 *
        intensity *
        direction,

      isWarriorVisible: true,

      warriorProgress: progress,

      isActive: true,
    }
  }

  // =====================================================
  // 11.3 — STEAL
  // The glass temporarily disappears.
  // Filling can continue while it is hidden.
  // =====================================================

  if (mode === 'steal') {
    const duration =
      Math.max(
        hideDuration,
        0.1,
      )

    if (timeSinceTrigger > duration) {
      return emptyResult
    }

    return {
      ...emptyResult,

      isGlassHidden: true,
      isWarriorVisible: true,

      warriorProgress:
        Math.min(
          timeSinceTrigger /
            duration,
          1,
        ),

      isActive: true,
    }
  }

  // =====================================================
  // 11.4 — OBSTRUCTION
  // A warrior blocks part of the glass.
  // =====================================================

  if (mode === 'obstruction') {
    const duration =
      Math.max(
        hideDuration,
        1,
      )

    if (timeSinceTrigger > duration) {
      return emptyResult
    }

    return {
      ...emptyResult,

      visualObstruction:
        obstruction,

      isWarriorVisible: true,

      warriorProgress:
        Math.min(
          timeSinceTrigger /
            duration,
          1,
        ),

      isActive: true,
    }
  }

  // =====================================================
  // 11.5 — WAR ZONE
  // Every trigger produces a different interference.
  // =====================================================

  if (mode === 'war-zone') {
    const eventType =
      latestTriggerIndex % 4

    // Event 1 — crossing
    if (eventType === 0) {
      const duration = 1

      if (timeSinceTrigger > duration) {
        return emptyResult
      }

      return {
        ...emptyResult,

        visualObstruction:
          obstruction,

        isWarriorVisible: true,

        warriorProgress:
          Math.min(
            timeSinceTrigger /
              duration,
            1,
          ),

        isActive: true,
      }
    }

    // Event 2 — push
    if (eventType === 1) {
      const duration = 0.65

      if (timeSinceTrigger > duration) {
        return emptyResult
      }

      const progress =
        Math.min(
          timeSinceTrigger /
            duration,
          1,
        )

      const intensity =
        1 - progress

      return {
        ...emptyResult,

        glassOffsetX:
          pushStrength *
          intensity,

        glassRotation:
          pushStrength *
          0.25 *
          intensity,

        isWarriorVisible: true,

        warriorProgress: progress,

        isActive: true,
      }
    }

    // Event 3 — glass stolen
    if (eventType === 2) {
      const duration =
        Math.max(
          hideDuration,
          0.1,
        )

      if (timeSinceTrigger > duration) {
        return emptyResult
      }

      return {
        ...emptyResult,

        isGlassHidden: true,
        isWarriorVisible: true,

        warriorProgress:
          Math.min(
            timeSinceTrigger /
              duration,
            1,
          ),

        isActive: true,
      }
    }

    // Event 4 — obstruction
    const duration =
      Math.max(
        hideDuration,
        1,
      )

    if (timeSinceTrigger > duration) {
      return emptyResult
    }

    return {
      ...emptyResult,

      visualObstruction:
        obstruction,

      isWarriorVisible: true,

      warriorProgress:
        Math.min(
          timeSinceTrigger /
            duration,
          1,
        ),

      isActive: true,
    }
  }

  return emptyResult
}