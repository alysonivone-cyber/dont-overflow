import { afterEach, describe, expect, it, vi } from 'vitest'
import { levels } from './levels'
import {
  completeLevel,
  getLevelKey,
  getLevelStars,
  getWorldStars,
  isLevelUnlocked,
  isWorldUnlocked,
  loadPlayerProgress,
  savePlayerProgress,
  type PlayerProgress,
} from './playerProgress'

const first = levels[0]
const second = levels[1]
const last = levels[levels.length - 1]

function progressWith(stars: number): PlayerProgress {
  return { completedLevels: { [getLevelKey(first.world, first.id)]: stars } }
}

afterEach(() => vi.unstubAllGlobals())

describe('player progress', () => {
  it('creates stable world.level keys', () => {
    expect(getLevelKey(3, 2)).toBe('3.2')
  })

  it('unlocks the first level but not the next one initially', () => {
    const empty: PlayerProgress = { completedLevels: {} }
    expect(isLevelUnlocked(empty, first.world, first.id)).toBe(true)
    expect(isLevelUnlocked(empty, second.world, second.id)).toBe(false)
    expect(isWorldUnlocked(empty, first.world)).toBe(true)
  })

  it('unlocks the next level after completing the previous one', () => {
    const updated = completeLevel({ completedLevels: {} }, first.world, first.id, 2)
    expect(isLevelUnlocked(updated, second.world, second.id)).toBe(true)
  })

  it('does not decrease earned stars on replay', () => {
    const replayed = completeLevel(progressWith(3), first.world, first.id, 2)
    expect(getLevelStars(replayed, first.world, first.id)).toBe(3)
  })

  it('upgrades earned stars on a better replay', () => {
    const replayed = completeLevel(progressWith(2), first.world, first.id, 3)
    expect(getLevelStars(replayed, first.world, first.id)).toBe(3)
  })

  it('does not mutate the original progress object', () => {
    const before = progressWith(1)
    const after = completeLevel(before, first.world, first.id, 3)
    expect(getLevelStars(before, first.world, first.id)).toBe(1)
    expect(getLevelStars(after, first.world, first.id)).toBe(3)
  })

  it('limits awarded stars to the 1–3 range', () => {
    const empty: PlayerProgress = { completedLevels: {} }
    expect(getLevelStars(completeLevel(empty, first.world, first.id, 9), first.world, first.id)).toBe(3)
    expect(getLevelStars(completeLevel(empty, first.world, first.id, 0), first.world, first.id)).toBe(1)
  })

  it('adds stars within the matching world only', () => {
    const nextWorld = levels.find((level) => level.world !== first.world)
    expect(nextWorld).toBeDefined()
    const progress: PlayerProgress = {
      completedLevels: {
        [getLevelKey(first.world, first.id)]: 2,
        [getLevelKey(nextWorld!.world, nextWorld!.id)]: 3,
      },
    }
    expect(getWorldStars(progress, first.world)).toBe(2)
    expect(getWorldStars(progress, nextWorld!.world)).toBe(3)
  })

  it('rejects unknown levels and worlds', () => {
    const empty: PlayerProgress = { completedLevels: {} }
    expect(isLevelUnlocked(empty, 999, 999)).toBe(false)
    expect(isWorldUnlocked(empty, 999)).toBe(false)
    expect(getLevelStars(empty, last.world, last.id)).toBe(0)
  })
})

describe('progress persistence', () => {
  it('returns empty progress when no save exists', () => {
    vi.stubGlobal('localStorage', { getItem: () => null })
    expect(loadPlayerProgress()).toEqual({ completedLevels: {} })
  })

  it('saves and reloads progress', () => {
    let stored: string | null = null
    vi.stubGlobal('localStorage', {
      getItem: () => stored,
      setItem: (_key: string, value: string) => { stored = value },
    })
    const progress = progressWith(3)
    savePlayerProgress(progress)
    expect(loadPlayerProgress()).toEqual(progress)
  })

  it('ignores malformed JSON without crashing', () => {
    vi.stubGlobal('localStorage', { getItem: () => '{broken' })
    expect(loadPlayerProgress()).toEqual({ completedLevels: {} })
  })

  it('rejects invalid star values and unknown level keys', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => JSON.stringify({ completedLevels: {
        [getLevelKey(first.world, first.id)]: 7,
        '999.999': 3,
      } }),
    })
    expect(loadPlayerProgress()).toEqual({ completedLevels: {} })
  })

  it('ignores invalid saved progress structures', () => {
    vi.stubGlobal('localStorage', { getItem: () => JSON.stringify({ completedLevels: [] }) })
    expect(loadPlayerProgress()).toEqual({ completedLevels: {} })
  })

  it('does not crash when storage access is blocked', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => { throw new Error('Blocked') },
      setItem: () => { throw new Error('Blocked') },
    })
    expect(loadPlayerProgress()).toEqual({ completedLevels: {} })
    expect(() => savePlayerProgress(progressWith(2))).not.toThrow()
  })
})
