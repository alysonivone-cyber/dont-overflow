import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  getMudInterference,
} from './getMudInterference'

describe(
  'getMudInterference',
  () => {
    it('does nothing before the first mud trigger', () => {
      const result =
        getMudInterference({
          mode: 'splash',
          elapsedTime: 0.5,
          triggerTimes: [1],
          coverage: 20,
          duration: 1,
        })

      expect(
        result.triggeredSplashes,
      ).toBe(0)

      expect(
        result.visibleSplashes,
      ).toBe(0)

      expect(result.coverage).toBe(0)
      expect(result.intensity).toBe(0)
      expect(result.isActive).toBe(false)
    })

    it('activates one splash after its trigger', () => {
      const result =
        getMudInterference({
          mode: 'splash',
          elapsedTime: 1.1,
          triggerTimes: [1],
          coverage: 18,
          duration: 1,
        })

      expect(
        result.triggeredSplashes,
      ).toBe(1)

      expect(
        result.visibleSplashes,
      ).toBe(1)

      expect(result.coverage).toBe(18)
      expect(result.isActive).toBe(true)
    })

    it('allows multiple mud splashes to accumulate', () => {
      const result =
        getMudInterference({
          mode: 'multiple',
          elapsedTime: 2.5,
          triggerTimes: [
            0.5,
            1.2,
            2,
          ],
          coverage: 15,
          duration: 1,
        })

      expect(
        result.triggeredSplashes,
      ).toBe(3)

      expect(
        result.visibleSplashes,
      ).toBe(3)

      expect(result.coverage).toBe(45)
    })

    it('limits multiple mode to three visible splashes', () => {
      const result =
        getMudInterference({
          mode: 'multiple',
          elapsedTime: 5,
          triggerTimes: [
            0.5,
            1,
            1.5,
            2,
            2.5,
          ],
          coverage: 10,
          duration: 1,
        })

      expect(
        result.triggeredSplashes,
      ).toBe(5)

      expect(
        result.visibleSplashes,
      ).toBe(3)
    })

    it('builds progressive coverage during mud rain', () => {
      const result =
        getMudInterference({
          mode: 'rain',
          elapsedTime: 2,
          triggerTimes: [
            0.4,
            0.8,
            1.2,
            1.6,
          ],
          coverage: 20,
          duration: 1,
        })

      expect(
        result.visibleSplashes,
      ).toBe(4)

      expect(
        result.coverage,
      ).toBeGreaterThan(20)
    })

    it('limits rain to five visible splashes', () => {
      const result =
        getMudInterference({
          mode: 'rain',
          elapsedTime: 5,
          triggerTimes: [
            0.4,
            0.8,
            1.2,
            1.6,
            2,
            2.4,
          ],
          coverage: 12,
          duration: 1,
        })

      expect(
        result.visibleSplashes,
      ).toBe(5)
    })

    it('makes blind mode more obstructive as splashes accumulate', () => {
      const early =
        getMudInterference({
          mode: 'blind',
          elapsedTime: 0.6,
          triggerTimes: [
            0.5,
            1,
            1.5,
          ],
          coverage: 18,
          duration: 1,
        })

      const late =
        getMudInterference({
          mode: 'blind',
          elapsedTime: 1.6,
          triggerTimes: [
            0.5,
            1,
            1.5,
          ],
          coverage: 18,
          duration: 1,
        })

      expect(
        late.coverage,
      ).toBeGreaterThan(
        early.coverage,
      )
    })

    it('caps disaster coverage at ninety-two percent', () => {
      const result =
        getMudInterference({
          mode: 'disaster',
          elapsedTime: 10,
          triggerTimes: [
            0.3,
            0.6,
            0.9,
            1.2,
            1.5,
            1.8,
            2.1,
          ],
          coverage: 30,
          duration: 1,
        })

      expect(result.coverage).toBe(92)

      expect(
        result.visibleSplashes,
      ).toBe(7)
    })
  },
)