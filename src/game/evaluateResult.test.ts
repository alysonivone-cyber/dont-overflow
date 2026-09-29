import { describe, expect, it } from 'vitest'

import { evaluateResult } from './evaluateResult'
import type { LevelConfig } from './types'

// =====================================================
// TEST LEVEL
// =====================================================
//
// On crée un niveau spécialement pour les tests.
//
// Target = 75%
// Tolerance = ±5%
//
// Donc :
// - moins de 70%  -> TOO LOW
// - de 70% à 80% -> SUCCESS / PERFECT
// - exactement 75% -> PERFECT
// - plus de 80% -> OVERFLOW
//

const testLevel: LevelConfig = {
  id: 1,
  world: 1,
  name: 'Test Level',
  instruction: 'Test the result evaluation.',
  target: 75,
  tolerance: 5,
  fillSpeed: 30,
  flowType: 'constant',
  attempts: 3,
  timeLimit: null,
  waterReserve: null,
  showPercentage: true,
  showTargetZone: true,
  containerShape: 'straight',
  inertia: 0,
}

// =====================================================
// EVALUATE RESULT TESTS
// =====================================================

describe('evaluateResult', () => {
  it('returns TOO LOW below the target zone', () => {
    expect(evaluateResult(69, testLevel)).toBe('TOO LOW')
  })

  it('accepts the lower boundary of the target zone', () => {
    expect(evaluateResult(70, testLevel)).toBe('SUCCESS')
  })

  it('returns SUCCESS inside the target zone', () => {
    expect(evaluateResult(73, testLevel)).toBe('SUCCESS')
  })

  it('returns PERFECT on the exact target', () => {
    expect(evaluateResult(75, testLevel)).toBe('PERFECT')
  })

  it('returns SUCCESS above the target but inside the tolerance', () => {
    expect(evaluateResult(78, testLevel)).toBe('SUCCESS')
  })

  it('accepts the upper boundary of the target zone', () => {
    expect(evaluateResult(80, testLevel)).toBe('SUCCESS')
  })

  it('returns OVERFLOW above the target zone', () => {
    expect(evaluateResult(81, testLevel)).toBe('OVERFLOW')
  })
})