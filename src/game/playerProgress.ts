
import { levels } from './levels'

const STORAGE_KEY = 'dont-overflow-progress-v1'

export type PlayerProgress = {
  completedLevels: Record<string, number>
}

export const emptyProgress: PlayerProgress = {
  completedLevels: {},
}

export function getLevelKey(
  world: number,
  levelId: number,
): string {
  return `${world}.${levelId}`
}

export function loadPlayerProgress(): PlayerProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) {
      return { completedLevels: {} }
    }

    const parsed: unknown = JSON.parse(saved)

    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('completedLevels' in parsed)
    ) {
      return { completedLevels: {} }
    }

    const entries = (
      parsed as PlayerProgress
    ).completedLevels

    if (
      typeof entries !== 'object' ||
      entries === null ||
      Array.isArray(entries)
    ) {
      return { completedLevels: {} }
    }

    const completedLevels: Record<string, number> = {}

    for (const level of levels) {
      const key = getLevelKey(level.world, level.id)
      const stars = entries[key]

      if (
        typeof stars === 'number' &&
        Number.isInteger(stars) &&
        stars >= 1 &&
        stars <= 3
      ) {
        completedLevels[key] = stars
      }
    }

    return { completedLevels }
  } catch {
    return { completedLevels: {} }
  }
}

export function savePlayerProgress(
  progress: PlayerProgress,
): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress),
    )
  } catch {
    // The browser may block local storage.
  }
}

export function isLevelUnlocked(
  progress: PlayerProgress,
  world: number,
  levelId: number,
): boolean {
  const index = levels.findIndex(
    (level) =>
      level.world === world &&
      level.id === levelId,
  )

  if (index === -1) return false
  if (index === 0) return true

  const previousLevel = levels[index - 1]
  const previousKey = getLevelKey(
    previousLevel.world,
    previousLevel.id,
  )

  return (progress.completedLevels[previousKey] ?? 0) > 0
}

export function isWorldUnlocked(
  progress: PlayerProgress,
  world: number,
): boolean {
  const firstLevel = levels.find(
    (level) => level.world === world,
  )

  if (!firstLevel) return false

  return isLevelUnlocked(
    progress,
    firstLevel.world,
    firstLevel.id,
  )
}

export function getLevelStars(
  progress: PlayerProgress,
  world: number,
  levelId: number,
): number {
  return progress.completedLevels[
    getLevelKey(world, levelId)
  ] ?? 0
}

export function getWorldStars(
  progress: PlayerProgress,
  world: number,
): number {
  return levels
    .filter((level) => level.world === world)
    .reduce(
      (total, level) =>
        total +
        getLevelStars(progress, world, level.id),
      0,
    )
}

export function completeLevel(
  progress: PlayerProgress,
  world: number,
  levelId: number,
  stars: number,
): PlayerProgress {
  const key = getLevelKey(world, levelId)

  const previousStars =
    progress.completedLevels[key] ?? 0

  return {
    completedLevels: {
      ...progress.completedLevels,
      [key]: Math.max(
        previousStars,
        Math.min(3, Math.max(1, stars)),
      ),
    },
  }
}
