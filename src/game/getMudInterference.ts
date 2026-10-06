import type {
  MudMode,
} from './types'

interface MudInterferenceInput {
  mode: MudMode
  elapsedTime: number
  triggerTimes: number[]
  coverage: number
  duration: number
}

export interface MudInterferenceResult {
  triggeredSplashes: number
  visibleSplashes: number
  coverage: number
  intensity: number
  isActive: boolean
}

export function getMudInterference({
  mode,
  elapsedTime,
  triggerTimes,
  coverage,
  duration,
}: MudInterferenceInput): MudInterferenceResult {
  const triggeredSplashes =
    triggerTimes.filter(
      (time) => elapsedTime >= time,
    ).length

  if (triggeredSplashes === 0) {
    return {
      triggeredSplashes: 0,
      visibleSplashes: 0,
      coverage: 0,
      intensity: 0,
      isActive: false,
    }
  }

  let visibleSplashes = 1
  let coverageMultiplier = 1

  if (mode === 'multiple') {
    visibleSplashes = Math.min(
      triggeredSplashes,
      3,
    )

    coverageMultiplier =
      visibleSplashes
  }

  if (mode === 'rain') {
    visibleSplashes = Math.min(
      triggeredSplashes,
      5,
    )

    coverageMultiplier =
      1 +
      (visibleSplashes - 1) * 0.65
  }

  if (mode === 'blind') {
    visibleSplashes = Math.min(
      triggeredSplashes,
      5,
    )

    coverageMultiplier =
      1 +
      (visibleSplashes - 1) * 0.8
  }

  if (mode === 'disaster') {
    visibleSplashes = Math.min(
      triggeredSplashes,
      7,
    )

    coverageMultiplier =
      1 +
      (visibleSplashes - 1) * 0.9
  }

  const finalCoverage =
    Math.min(
      coverage *
        coverageMultiplier,
      92,
    )

  const latestTrigger =
    triggerTimes[
      triggeredSplashes - 1
    ]

  const timeSinceLatest =
    elapsedTime - latestTrigger

  let intensity = 1

  if (
    duration > 0 &&
    timeSinceLatest > duration
  ) {
    intensity = 0.82
  }

  return {
    triggeredSplashes,
    visibleSplashes,
    coverage: finalCoverage,
    intensity,
    isActive: true,
  }
}