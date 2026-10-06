import {
  describe,
  expect,
  it,
} from 'vitest'

import {
  getSurvivorInterference,
} from './getSurvivorInterference'

describe(
  'getSurvivorInterference',
  () => {
    it('does nothing before the first trigger', () => {
      const result =
        getSurvivorInterference({
          mode: 'aftershock',
          elapsedTime: 0.5,
          triggerTimes: [1],
          shakeStrength: 12,
          blackoutDuration: 1,
          pressureStrength: 0.4,
        })

      expect(result.isActive).toBe(
        false,
      )

      expect(result.isShaking).toBe(
        false,
      )

      expect(
        result.flowMultiplier,
      ).toBe(1)

      expect(
        result.blackoutOpacity,
      ).toBe(0)
    })

    it('activates an aftershock after its trigger', () => {
      const result =
        getSurvivorInterference({
          mode: 'aftershock',
          elapsedTime: 1.2,
          triggerTimes: [1],
          shakeStrength: 12,
          blackoutDuration: 1,
          pressureStrength: 0.4,
        })

      expect(result.isActive).toBe(
        true,
      )

      expect(result.isShaking).toBe(
        true,
      )
    })

    it('ends an aftershock after its active window', () => {
      const result =
        getSurvivorInterference({
          mode: 'aftershock',
          elapsedTime: 1.8,
          triggerTimes: [1],
          shakeStrength: 12,
          blackoutDuration: 1,
          pressureStrength: 0.4,
        })

      expect(result.isShaking).toBe(
        false,
      )

      expect(result.isActive).toBe(
        false,
      )
    })

    it('increases flow during pressure', () => {
      const result =
        getSurvivorInterference({
          mode: 'pressure',
          elapsedTime: 1.3,
          triggerTimes: [1],
          shakeStrength: 0,
          blackoutDuration: 1,
          pressureStrength: 0.5,
        })

      expect(
        result.isPressureActive,
      ).toBe(true)

      expect(
        result.flowMultiplier,
      ).toBe(1.5)
    })

    it('returns flow to normal after pressure', () => {
      const result =
        getSurvivorInterference({
          mode: 'pressure',
          elapsedTime: 2,
          triggerTimes: [1],
          shakeStrength: 0,
          blackoutDuration: 1,
          pressureStrength: 0.5,
        })

      expect(
        result.isPressureActive,
      ).toBe(false)

      expect(
        result.flowMultiplier,
      ).toBe(1)
    })

    it('creates a blackout during its active window', () => {
      const result =
        getSurvivorInterference({
          mode: 'blackout',
          elapsedTime: 1.5,
          triggerTimes: [1],
          shakeStrength: 0,
          blackoutDuration: 1,
          pressureStrength: 0,
        })

      expect(
        result.isBlackout,
      ).toBe(true)

      expect(
        result.blackoutOpacity,
      ).toBeGreaterThan(0)
    })

    it('removes blackout after its duration', () => {
      const result =
        getSurvivorInterference({
          mode: 'blackout',
          elapsedTime: 2.2,
          triggerTimes: [1],
          shakeStrength: 0,
          blackoutDuration: 1,
          pressureStrength: 0,
        })

      expect(
        result.isBlackout,
      ).toBe(false)

      expect(
        result.blackoutOpacity,
      ).toBe(0)
    })

    it('cycles through critical events', () => {
      const shake =
        getSurvivorInterference({
          mode: 'critical',
          elapsedTime: 1,
          triggerTimes: [
            1,
            2,
            3,
          ],
          shakeStrength: 10,
          blackoutDuration: 1,
          pressureStrength: 0.4,
        })

      const pressure =
        getSurvivorInterference({
          mode: 'critical',
          elapsedTime: 2,
          triggerTimes: [
            1,
            2,
            3,
          ],
          shakeStrength: 10,
          blackoutDuration: 1,
          pressureStrength: 0.4,
        })

      const blackout =
        getSurvivorInterference({
          mode: 'critical',
          elapsedTime: 3,
          triggerTimes: [
            1,
            2,
            3,
          ],
          shakeStrength: 10,
          blackoutDuration: 1,
          pressureStrength: 0.4,
        })

      expect(
        shake.isShaking,
      ).toBe(true)

      expect(
        pressure.isPressureActive,
      ).toBe(true)

      expect(
        blackout.isBlackout,
      ).toBe(true)
    })

    it('cycles through survival events', () => {
      const shake =
        getSurvivorInterference({
          mode: 'survival',
          elapsedTime: 0.5,
          triggerTimes: [
            0.5,
            1.2,
            1.9,
          ],
          shakeStrength: 14,
          blackoutDuration: 0.7,
          pressureStrength: 0.45,
        })

      const pressure =
        getSurvivorInterference({
          mode: 'survival',
          elapsedTime: 1.2,
          triggerTimes: [
            0.5,
            1.2,
            1.9,
          ],
          shakeStrength: 14,
          blackoutDuration: 0.7,
          pressureStrength: 0.45,
        })

      const blackout =
        getSurvivorInterference({
          mode: 'survival',
          elapsedTime: 1.9,
          triggerTimes: [
            0.5,
            1.2,
            1.9,
          ],
          shakeStrength: 14,
          blackoutDuration: 0.7,
          pressureStrength: 0.45,
        })

      expect(
        shake.isShaking,
      ).toBe(true)

      expect(
        pressure.isPressureActive,
      ).toBe(true)

      expect(
        blackout.isBlackout,
      ).toBe(true)
    })

    it('tracks triggered survival events', () => {
      const result =
        getSurvivorInterference({
          mode: 'survival',
          elapsedTime: 2.5,
          triggerTimes: [
            0.5,
            1.5,
            3,
          ],
          shakeStrength: 12,
          blackoutDuration: 0.8,
          pressureStrength: 0.4,
        })

      expect(
        result.triggeredEvents,
      ).toBe(2)
    })
  },
)