import { useEffect, useRef, useState } from 'react'
import './App.css'

import { levels } from './game/levels'
import { evaluateResult } from './game/evaluateResult'
import { getVisualWaterLevel } from './game/getVisualWaterLevel'
import { getFlowSpeed } from './game/getFlowSpeed'
import { getEvaporationRate } from './game/getEvaporationRate'
import { getObstacleEffect } from './game/getObstacleEffect'
import { getContainerMotion } from './game/getContainerMotion'
import { getAnimalInterference } from './game/getAnimalInterference'
import { getWarriorInterference } from './game/getWarriorInterference'
import { getSurvivorInterference } from './game/getSurvivorInterference'
import { getMudInterference } from './game/getMudInterference'

import type { GameResult } from './game/types'

import ResultFeedback from './components/ResultFeedback'
import ObstacleField from './components/ObstacleField'
import FrogField from './components/FrogField'
import WarriorField from './components/WarriorField'
import MudField from './components/MudField'

import {
  playSuccessSound,
  playErrorSound,
  playGameOverSound,
  playMudSplatSound,
} from './game/soundManager'

function App() {
  // =====================================================
  // DEV MENU
  // =====================================================

  const [devMenuOpen, setDevMenuOpen] =
    useState(false)

  const [devWorld, setDevWorld] =
    useState(1)

  // =====================================================
  // CORE GAME STATE
  // =====================================================

  const [currentLevelIndex, setCurrentLevelIndex] =
    useState(0)

  const currentLevel =
    levels[currentLevelIndex]

  const [waterLevel, setWaterLevel] =
    useState(0)

  const [isFilling, setIsFilling] =
    useState(false)

  const [result, setResult] =
    useState<GameResult>('waiting')

  const [attemptsLeft, setAttemptsLeft] =
    useState(levels[0].attempts)

  const [worldComplete, setWorldComplete] =
    useState(false)

  const [gameComplete, setGameComplete] =
    useState(false)

  // =====================================================
  // TIMER / PRESSURE STATE
  // =====================================================

  const [elapsedTime, setElapsedTime] =
    useState(0)

  const [timerStarted, setTimerStarted] =
    useState(false)

  // =====================================================
  // WATER RESERVE STATE
  // =====================================================

  const [waterReserve, setWaterReserve] =
    useState<number | null>(
      levels[0].waterReserve,
    )

  // =====================================================
  // INERTIA STATE
  // =====================================================

  const [isInertiaActive, setIsInertiaActive] =
    useState(false)

  const [inertiaTimeLeft, setInertiaTimeLeft] =
    useState(0)

  // =====================================================
  // WORLD 5 — ENVIRONMENT STATE
  // =====================================================

  const [
    currentTemperature,
    setCurrentTemperature,
  ] = useState<number | null>(
    levels[0].temperature ?? null,
  )

  const [isEvaporating, setIsEvaporating] =
    useState(false)

  const [
    evaporationTimeLeft,
    setEvaporationTimeLeft,
  ] = useState(0)

  // =====================================================
  // REFS
  // =====================================================

  const waterLevelRef =
    useRef(0)

  const waterReserveRef =
    useRef<number | null>(
      levels[0].waterReserve,
    )

  const temperatureRef =
    useRef<number | null>(
      levels[0].temperature ?? null,
    )

  const evaporationTimeRef =
    useRef(0)

  const previousMudSplashesRef =
    useRef(0)

  // =====================================================
  // WORLD 8 — FROG INVASION REF
  // =====================================================

  const appliedFrogOffsetRef =
    useRef(0)

  // =====================================================
  // KEEP REFS SYNCHRONIZED
  // =====================================================

  useEffect(() => {
    waterLevelRef.current =
      waterLevel
  }, [waterLevel])

  useEffect(() => {
    waterReserveRef.current =
      waterReserve
  }, [waterReserve])

  useEffect(() => {
    temperatureRef.current =
      currentTemperature
  }, [currentTemperature])

  useEffect(() => {
    evaporationTimeRef.current =
      evaporationTimeLeft
  }, [evaporationTimeLeft])

  // =====================================================
  // LEVEL STATUS
  // =====================================================

  const levelSucceeded =
    result === 'SUCCESS' ||
    result === 'PERFECT'

  const levelFailed =
    attemptsLeft === 0 &&
    !levelSucceeded

  const nextLevelConfig =
    levels[currentLevelIndex + 1]

  const isLastLevelOfWorld =
    !nextLevelConfig ||
    nextLevelConfig.world !==
      currentLevel.world

  // =====================================================
  // WORLD 3 — TIMER
  // =====================================================

  const hasTimeLimit =
    currentLevel.timeLimit !== null

  const timeLeft =
    currentLevel.timeLimit === null
      ? null
      : Math.max(
          currentLevel.timeLimit -
            elapsedTime,
          0,
        )

  // =====================================================
  // WORLD 4 — WATER RESERVE / INERTIA
  // =====================================================

  const hasWaterReserve =
    currentLevel.waterReserve !== null

  const maximumWaterReserve =
    currentLevel.waterReserve

  const reservePercentage =
    maximumWaterReserve === null ||
    waterReserve === null
      ? 100
      : Math.max(
          Math.min(
            (waterReserve /
              maximumWaterReserve) *
              100,
            100,
          ),
          0,
        )

  const hasInertia =
    currentLevel.inertia > 0

  // =====================================================
  // WORLD 5 — ENVIRONMENT
  // =====================================================

  const hasEnvironment =
    currentLevel.temperature !== undefined &&
    currentLevel.evaporationRate !== undefined &&
    currentLevel.evaporationDuration !== undefined

  const initialTemperature =
    currentLevel.temperature ?? 0

  const evaporationBaseRate =
    currentLevel.evaporationRate ?? 0

  const evaporationDuration =
    currentLevel.evaporationDuration ?? 0

  const currentEvaporationRate =
    hasEnvironment &&
    currentTemperature !== null
      ? getEvaporationRate({
          baseRate:
            evaporationBaseRate,
          currentTemperature,
          initialTemperature,
        })
      : 0

  const temperaturePercentage =
    currentTemperature === null
      ? 0
      : Math.max(
          0,
          Math.min(
            currentTemperature,
            100,
          ),
        )

  // =====================================================
  // WORLD 6 — OBSTACLES
  // =====================================================

  const hasObstacles =
    currentLevel.obstacleMode !==
    undefined

  const obstacleMode =
    currentLevel.obstacleMode ??
    'fixed'

  const obstacleStrength =
    currentLevel.obstacleStrength ??
    0

  const obstaclePositions =
    currentLevel.obstaclePositions ??
    []

  const obstacleMovementSpeed =
    currentLevel.obstacleMovementSpeed ??
    0

  const blindSpotSize =
    currentLevel.blindSpotSize ??
    0

  const obstacleEffect =
    hasObstacles
      ? getObstacleEffect({
          waterLevel,
          elapsedTime,
          mode: obstacleMode,
          strength:
            obstacleStrength,
          positions:
            obstaclePositions,
          movementSpeed:
            obstacleMovementSpeed,
        })
      : {
          flowMultiplier: 1,
          activePositions: [],
          isBlockingFlow: false,
        }

  // =====================================================
  // WORLD 7 — MOTION
  // =====================================================

  const hasMotion =
    currentLevel.motionMode !==
    undefined

  const motionMode =
    currentLevel.motionMode ??
    'horizontal'

  const motionAmplitude =
    currentLevel.motionAmplitude ??
    0

  const motionSpeed =
    currentLevel.motionSpeed ??
    0

  const containerMotion =
    hasMotion
      ? getContainerMotion({
          elapsedTime,
          mode: motionMode,
          amplitude:
            motionAmplitude,
          speed: motionSpeed,
        })
      : {
          x: 0,
          y: 0,
          rotation: 0,
        }

  // =====================================================
  // WORLD 8 — FROG INVASION
  // =====================================================

  const hasFrogs =
    currentLevel.frogMode !==
    undefined

  const frogMode =
    currentLevel.frogMode ??
    'single'

  const frogTriggerTimes =
    currentLevel.frogTriggerTimes ??
    []

  const frogDisplacement =
    currentLevel.frogDisplacement ??
    0

  const frogExitDisplacement =
    currentLevel.frogExitDisplacement ??
    0

  const frogObstruction =
    currentLevel.frogObstruction ??
    0

  const frogShakeStrength =
    currentLevel.frogShakeStrength ??
    0

  const frogInterference =
    hasFrogs
      ? getAnimalInterference({
          mode: frogMode,
          elapsedTime,
          triggerTimes:
            frogTriggerTimes,
          displacement:
            frogDisplacement,
          exitDisplacement:
            frogExitDisplacement,
          obstruction:
            frogObstruction,
          shakeStrength:
            frogShakeStrength,
        })
      : {
          triggeredEvents: 0,
          waterOffset: 0,
          frogsInGlass: 0,
          visualObstruction: 0,
          glassOffsetX: 0,
          glassOffsetY: 0,
          glassRotation: 0,
          isActive: false,
        }

  // =====================================================
  // WORLD 11 — WARRIORS
  // =====================================================

  const hasWarriors =
    currentLevel.warriorMode !==
    undefined

  const warriorMode =
    currentLevel.warriorMode ??
    'crossing'

  const warriorTriggerTimes =
    currentLevel.warriorTriggerTimes ??
    []

  const warriorPushStrength =
    currentLevel.warriorPushStrength ??
    0

  const warriorHideDuration =
    currentLevel.warriorHideDuration ??
    0

  const warriorObstruction =
    currentLevel.warriorObstruction ??
    0

  const warriorInterference =
    hasWarriors
      ? getWarriorInterference({
          mode: warriorMode,
          elapsedTime,
          triggerTimes:
            warriorTriggerTimes,
          pushStrength:
            warriorPushStrength,
          hideDuration:
            warriorHideDuration,
          obstruction:
            warriorObstruction,
        })
      : {
          triggeredEvents: 0,

          glassOffsetX: 0,
          glassOffsetY: 0,
          glassRotation: 0,

          visualObstruction: 0,

          isGlassHidden: false,
          isWarriorVisible: false,

          warriorProgress: 0,
          isActive: false,
        }

  // =====================================================
  // WORLD 12 — SURVIVORS
  // =====================================================

  const hasSurvivors =
    currentLevel.survivorMode !==
    undefined

  const survivorMode =
    currentLevel.survivorMode ??
    'aftershock'

  const survivorTriggerTimes =
    currentLevel.survivorTriggerTimes ??
    []

  const survivorShakeStrength =
    currentLevel.survivorShakeStrength ??
    0

  const survivorBlackoutDuration =
    currentLevel.survivorHideDuration ??
    0

  const survivorPressureStrength =
    currentLevel.survivorObstruction ??
    0

  const survivorInterference =
    hasSurvivors
      ? getSurvivorInterference({
          mode: survivorMode,
          elapsedTime,
          triggerTimes:
            survivorTriggerTimes,
          shakeStrength:
            survivorShakeStrength,
          blackoutDuration:
            survivorBlackoutDuration,
          pressureStrength:
            survivorPressureStrength,
        })
      : {
          triggeredEvents: 0,

          glassOffsetX: 0,
          glassOffsetY: 0,
          glassRotation: 0,

          flowMultiplier: 1,

          blackoutOpacity: 0,

          isShaking: false,
          isBlackout: false,
          isPressureActive: false,

          isActive: false,
        }

  // =====================================================
  // CURRENT FLOW SPEED
  // =====================================================

  const baseFlowSpeed =
    getFlowSpeed({
      baseSpeed:
        currentLevel.fillSpeed,
      flowType:
        currentLevel.flowType,
      waterLevel,
      elapsedTime,
    })

  const currentFlowSpeed =
    baseFlowSpeed *
    obstacleEffect.flowMultiplier

  // =====================================================
  // WORLD 13 — MUD
  // =====================================================

  const hasMud =
    currentLevel.mudMode !==
    undefined

  const mudMode =
    currentLevel.mudMode ??
    'splash'

  const mudTriggerTimes =
    currentLevel.mudTriggerTimes ??
    []

  const mudCoverage =
    currentLevel.mudCoverage ??
    0

  const mudDuration =
    currentLevel.mudDuration ??
    0

  const mudMegaSplash =
    currentLevel.mudMegaSplash ??
    false

  const mudInterference =
    hasMud
      ? getMudInterference({
          mode: mudMode,
          elapsedTime,
          triggerTimes:
            mudTriggerTimes,
          coverage:
            mudCoverage,
          duration:
            mudDuration,
        })
      : {
          triggeredSplashes: 0,
          visibleSplashes: 0,
          coverage: 0,
          intensity: 0,
          isActive: false,
        }

  // =====================================================
  // WORLD 13 — MUD SOUND
  // =====================================================

  useEffect(() => {
    if (!hasMud) {
      previousMudSplashesRef.current =
        0
      return
    }

    if (
      mudInterference.triggeredSplashes >
      previousMudSplashesRef.current
    ) {
      playMudSplatSound()
    }

    previousMudSplashesRef.current =
      mudInterference.triggeredSplashes
  }, [
    hasMud,
    mudInterference.triggeredSplashes,
  ])

  // =====================================================
  // ATTEMPT RESULT HELPERS
  // =====================================================

  const registerFailure = () => {
    setIsFilling(false)
    setIsInertiaActive(false)
    setInertiaTimeLeft(0)
    setIsEvaporating(false)
    setEvaporationTimeLeft(0)

    const nextAttempts =
      Math.max(
        attemptsLeft - 1,
        0,
      )

    setAttemptsLeft(
      nextAttempts,
    )

    if (nextAttempts === 0) {
      playGameOverSound()
    } else {
      playErrorSound()
    }
  }

  const finishAttempt = (
    finalWaterLevel: number,
  ) => {
    setIsFilling(false)
    setIsInertiaActive(false)
    setInertiaTimeLeft(0)
    setIsEvaporating(false)
    setEvaporationTimeLeft(0)

    const evaluatedResult =
      evaluateResult(
        finalWaterLevel,
        currentLevel,
      )

    setResult(
      evaluatedResult,
    )

    if (
      evaluatedResult ===
        'SUCCESS' ||
      evaluatedResult ===
        'PERFECT'
    ) {
      playSuccessSound()
      return
    }

    registerFailure()
  }

  const startEvaporationOrFinish = (
    finalWaterLevel: number,
  ) => {
    if (
      !hasEnvironment ||
      evaporationBaseRate <= 0 ||
      evaporationDuration <= 0
    ) {
      finishAttempt(
        finalWaterLevel,
      )
      return
    }

    setIsFilling(false)
    setIsInertiaActive(false)
    setInertiaTimeLeft(0)

    setEvaporationTimeLeft(
      evaporationDuration,
    )

    evaporationTimeRef.current =
      evaporationDuration

    setIsEvaporating(true)
  }

  // =====================================================
  // WORLD 8 — APPLY FROG WATER DISPLACEMENT
  // =====================================================

  useEffect(() => {
    if (
      !hasFrogs ||
      result !== 'waiting' ||
      worldComplete ||
      gameComplete ||
      levelSucceeded ||
      levelFailed
    ) {
      return
    }

    const previousOffset =
      appliedFrogOffsetRef.current

    const nextOffset =
      frogInterference.waterOffset

    const offsetDifference =
      nextOffset -
      previousOffset

    if (
      offsetDifference === 0
    ) {
      return
    }

    const nextWater =
      Math.max(
        0,
        Math.min(
          waterLevelRef.current +
            offsetDifference,
          100,
        ),
      )

    waterLevelRef.current =
      nextWater

    setWaterLevel(
      nextWater,
    )

    appliedFrogOffsetRef.current =
      nextOffset
  }, [
    hasFrogs,
    frogInterference.waterOffset,
    result,
    worldComplete,
    gameComplete,
    levelSucceeded,
    levelFailed,
  ])

  // =====================================================
  // WATER FILLING
  // =====================================================

  useEffect(() => {
    if (
      !isFilling ||
      isInertiaActive ||
      isEvaporating ||
      worldComplete ||
      gameComplete ||
      levelSucceeded ||
      levelFailed ||
      result !== 'waiting'
    ) {
      return
    }

    const interval =
      window.setInterval(() => {
        const currentWater =
          waterLevelRef.current

        const normalFlowSpeed =
          getFlowSpeed({
            baseSpeed:
              currentLevel.fillSpeed,
            flowType:
              currentLevel.flowType,
            waterLevel:
              currentWater,
            elapsedTime,
          })

        const liveObstacleEffect =
          hasObstacles
            ? getObstacleEffect({
                waterLevel:
                  currentWater,
                elapsedTime,
                mode:
                  obstacleMode,
                strength:
                  obstacleStrength,
                positions:
                  obstaclePositions,
                movementSpeed:
                  obstacleMovementSpeed,
              })
            : {
                flowMultiplier: 1,
                activePositions: [],
                isBlockingFlow:
                  false,
              }

        const effectiveSpeed =
          normalFlowSpeed *
          liveObstacleEffect.flowMultiplier *
          survivorInterference.flowMultiplier

        const amountToAdd =
          effectiveSpeed / 100

        if (!hasWaterReserve) {
          const nextWater =
            currentWater +
            amountToAdd

          waterLevelRef.current =
            nextWater

          setWaterLevel(
            nextWater,
          )

          return
        }

        const currentReserve =
          waterReserveRef.current ??
          0

        const actualAmount =
          Math.min(
            amountToAdd,
            currentReserve,
          )

        const nextWater =
          currentWater +
          actualAmount

        const nextReserve =
          Math.max(
            currentReserve -
              actualAmount,
            0,
          )

        waterLevelRef.current =
          nextWater

        waterReserveRef.current =
          nextReserve

        setWaterLevel(
          nextWater,
        )

        setWaterReserve(
          nextReserve,
        )

        if (nextReserve <= 0) {
          setIsFilling(false)

          window.setTimeout(
            () => {
              startEvaporationOrFinish(
                nextWater,
              )
            },
            0,
          )
        }
      }, 10)

    return () => {
      window.clearInterval(
        interval,
      )
    }
  }, [
    isFilling,
    isInertiaActive,
    isEvaporating,
    currentLevel.fillSpeed,
    currentLevel.flowType,
    elapsedTime,
    hasWaterReserve,
    hasObstacles,
    obstacleMode,
    obstacleStrength,
    obstaclePositions,
    obstacleMovementSpeed,
    survivorInterference.flowMultiplier,
    worldComplete,
    gameComplete,
    levelSucceeded,
    levelFailed,
    result,
  ])

  // =====================================================
  // GLOBAL GAME CLOCK
  // =====================================================

  useEffect(() => {
    if (
      !timerStarted ||
      result !== 'waiting' ||
      worldComplete ||
      gameComplete ||
      levelSucceeded ||
      levelFailed
    ) {
      return
    }

    const timerInterval =
      window.setInterval(() => {
        setElapsedTime(
          (currentTime) =>
            currentTime + 0.05,
        )
      }, 50)

    return () =>
      window.clearInterval(
        timerInterval,
      )
  }, [
    timerStarted,
    result,
    worldComplete,
    gameComplete,
    levelSucceeded,
    levelFailed,
  ])

  // =====================================================
  // WORLD 3 — TIME LIMIT
  // =====================================================

  useEffect(() => {
    if (
      !hasTimeLimit ||
      timeLeft === null ||
      timeLeft > 0 ||
      result !== 'waiting' ||
      levelSucceeded ||
      levelFailed
    ) {
      return
    }

    setTimerStarted(false)
    setIsFilling(false)
    setIsInertiaActive(false)
    setInertiaTimeLeft(0)
    setIsEvaporating(false)
    setEvaporationTimeLeft(0)

    setResult('TOO LOW')

    registerFailure()
  }, [
    hasTimeLimit,
    timeLeft,
    result,
    levelSucceeded,
    levelFailed,
  ])

  // =====================================================
  // WORLD 4 — INERTIA
  // =====================================================

  useEffect(() => {
    if (
      !isInertiaActive ||
      inertiaTimeLeft <= 0 ||
      result !== 'waiting' ||
      levelSucceeded ||
      levelFailed
    ) {
      return
    }

    const interval =
      window.setInterval(() => {
        const currentWater =
          waterLevelRef.current

        const normalFlowSpeed =
          getFlowSpeed({
            baseSpeed:
              currentLevel.fillSpeed,
            flowType:
              currentLevel.flowType,
            waterLevel:
              currentWater,
            elapsedTime,
          })

        const liveObstacleEffect =
          hasObstacles
            ? getObstacleEffect({
                waterLevel:
                  currentWater,
                elapsedTime,
                mode:
                  obstacleMode,
                strength:
                  obstacleStrength,
                positions:
                  obstaclePositions,
                movementSpeed:
                  obstacleMovementSpeed,
              })
            : {
                flowMultiplier: 1,
                activePositions: [],
                isBlockingFlow:
                  false,
              }

        const effectiveSpeed =
          normalFlowSpeed *
          liveObstacleEffect.flowMultiplier

        const amountToAdd =
          effectiveSpeed / 100

        let actualAmount =
          amountToAdd

        if (hasWaterReserve) {
          const currentReserve =
            waterReserveRef.current ??
            0

          actualAmount =
            Math.min(
              amountToAdd,
              currentReserve,
            )

          const nextReserve =
            Math.max(
              currentReserve -
                actualAmount,
              0,
            )

          waterReserveRef.current =
            nextReserve

          setWaterReserve(
            nextReserve,
          )
        }

        const nextWater =
          currentWater +
          actualAmount

        waterLevelRef.current =
          nextWater

        setWaterLevel(
          nextWater,
        )

        setInertiaTimeLeft(
          (currentTime) =>
            Math.max(
              currentTime - 0.01,
              0,
            ),
        )
      }, 10)

    return () => {
      window.clearInterval(
        interval,
      )
    }
  }, [
    isInertiaActive,
    inertiaTimeLeft,
    currentLevel.fillSpeed,
    currentLevel.flowType,
    elapsedTime,
    hasWaterReserve,
    hasObstacles,
    obstacleMode,
    obstacleStrength,
    obstaclePositions,
    obstacleMovementSpeed,
    result,
    levelSucceeded,
    levelFailed,
  ])

  // =====================================================
  // FINISH INERTIA
  // =====================================================

  useEffect(() => {
    if (
      !isInertiaActive ||
      inertiaTimeLeft > 0
    ) {
      return
    }

    setIsInertiaActive(false)

    startEvaporationOrFinish(
      waterLevelRef.current,
    )
  }, [
    isInertiaActive,
    inertiaTimeLeft,
  ])

  // =====================================================
  // WORLD 5 — EVAPORATION
  // =====================================================

  useEffect(() => {
    if (
      !isEvaporating ||
      evaporationTimeLeft <= 0 ||
      result !== 'waiting' ||
      levelSucceeded ||
      levelFailed
    ) {
      return
    }

    const interval =
      window.setInterval(() => {
        const currentWater =
          waterLevelRef.current

        const currentTemp =
          temperatureRef.current ??
          initialTemperature

        const liveRate =
          getEvaporationRate({
            baseRate:
              evaporationBaseRate,
            currentTemperature:
              currentTemp,
            initialTemperature,
          })

        const amountToRemove =
          liveRate / 100

        const nextWater =
          Math.max(
            currentWater -
              amountToRemove,
            0,
          )

        waterLevelRef.current =
          nextWater

        setWaterLevel(
          nextWater,
        )

        const nextTemperature =
          Math.max(
            currentTemp - 0.03,
            0,
          )

        temperatureRef.current =
          nextTemperature

        setCurrentTemperature(
          nextTemperature,
        )

        const nextTime =
          Math.max(
            evaporationTimeRef.current -
              0.01,
            0,
          )

        evaporationTimeRef.current =
          nextTime

        setEvaporationTimeLeft(
          nextTime,
        )
      }, 10)

    return () => {
      window.clearInterval(
        interval,
      )
    }
  }, [
    isEvaporating,
    evaporationTimeLeft,
    evaporationBaseRate,
    initialTemperature,
    result,
    levelSucceeded,
    levelFailed,
  ])

  // =====================================================
  // FINISH EVAPORATION
  // =====================================================

  useEffect(() => {
    if (
      !isEvaporating ||
      evaporationTimeLeft > 0
    ) {
      return
    }

    setIsEvaporating(false)

    finishAttempt(
      waterLevelRef.current,
    )
  }, [
    isEvaporating,
    evaporationTimeLeft,
  ])

  // =====================================================
  // POINTER DOWN — START FILLING
  // =====================================================

  const pointerDown = () => {
    if (
      result !== 'waiting' ||
      levelSucceeded ||
      levelFailed ||
      worldComplete ||
      gameComplete ||
      isInertiaActive ||
      isEvaporating
    ) {
      return
    }

    if (
      hasWaterReserve &&
      (waterReserveRef.current ?? 0) <= 0
    ) {
      return
    }

    setIsFilling(true)

    if (!timerStarted) {
      setTimerStarted(true)
    }
  }

  // =====================================================
  // POINTER UP — RELEASE
  // =====================================================

  const pointerUp = () => {
    if (
      !isFilling ||
      result !== 'waiting'
    ) {
      return
    }

    setIsFilling(false)

    // The global clock freezes when the player releases.
    setTimerStarted(false)

    if (
      hasInertia &&
      currentLevel.inertia > 0
    ) {
      setInertiaTimeLeft(
        currentLevel.inertia,
      )

      setIsInertiaActive(true)
      return
    }

    startEvaporationOrFinish(
      waterLevelRef.current,
    )
  }

  // =====================================================
  // RESET CURRENT ATTEMPT
  // =====================================================

  const resetAttemptState = () => {
    setWaterLevel(0)
    waterLevelRef.current = 0

    setIsFilling(false)

    setResult('waiting')

    setElapsedTime(0)
    setTimerStarted(false)

    setIsInertiaActive(false)
    setInertiaTimeLeft(0)

    setIsEvaporating(false)
    setEvaporationTimeLeft(0)
    evaporationTimeRef.current = 0

    setCurrentTemperature(
      currentLevel.temperature ??
        null,
    )

    temperatureRef.current =
      currentLevel.temperature ??
      null

    appliedFrogOffsetRef.current =
      0

    previousMudSplashesRef.current =
      0
  }

  // =====================================================
  // RETRY LEVEL
  // =====================================================

  const retryLevel = () => {
    if (attemptsLeft <= 0) {
      return
    }

    resetAttemptState()
  }

  // =====================================================
  // LOAD LEVEL
  // =====================================================

  const loadLevel = (
    levelIndex: number,
  ) => {
    const level =
      levels[levelIndex]

    setCurrentLevelIndex(
      levelIndex,
    )

    setWaterLevel(0)
    waterLevelRef.current = 0

    setIsFilling(false)
    setResult('waiting')

    setAttemptsLeft(
      level.attempts,
    )

    setElapsedTime(0)
    setTimerStarted(false)

    setWaterReserve(
      level.waterReserve,
    )

    waterReserveRef.current =
      level.waterReserve

    setIsInertiaActive(false)
    setInertiaTimeLeft(0)

    setCurrentTemperature(
      level.temperature ?? null,
    )

    temperatureRef.current =
      level.temperature ?? null

    setIsEvaporating(false)
    setEvaporationTimeLeft(0)
    evaporationTimeRef.current = 0

    appliedFrogOffsetRef.current =
      0

    previousMudSplashesRef.current =
      0

    setWorldComplete(false)
  }

  // =====================================================
  // RESTART LEVEL
  // =====================================================

  const restartLevel = () => {
    loadLevel(currentLevelIndex)
  }

  // =====================================================
  // NEXT LEVEL / WORLD
  // =====================================================

  const goToNextLevel = () => {
    if (
      currentLevelIndex >=
      levels.length - 1
    ) {
      setGameComplete(true)
      setWorldComplete(false)
      return
    }

    if (isLastLevelOfWorld) {
      setWorldComplete(true)
      return
    }

    loadLevel(
      currentLevelIndex + 1,
    )
  }

  const goToNextWorld = () => {
    if (
      currentLevelIndex >=
      levels.length - 1
    ) {
      setGameComplete(true)
      setWorldComplete(false)
      return
    }

    loadLevel(
      currentLevelIndex + 1,
    )
  }

  // =====================================================
  // DEV MENU — JUMP TO LEVEL
  // =====================================================

  const jumpToDevLevel = (
    world: number,
    levelId: number,
  ) => {
    const targetIndex =
      levels.findIndex(
        (level) =>
          level.world === world &&
          level.id === levelId,
      )

    if (targetIndex === -1) {
      return
    }

    setDevWorld(world)
    setDevMenuOpen(false)
    setGameComplete(false)
    setWorldComplete(false)

    loadLevel(targetIndex)
  }

  // =====================================================
  // DISPLAY VALUES
  // =====================================================

  const displayedLevel =
    Math.round(waterLevel)

  const displayedReserve =
    waterReserve === null
      ? 0
      : Math.round(waterReserve)

  const displayedTime =
    timeLeft === null
      ? '—'
      : timeLeft.toFixed(1)

  const displayedTemperature =
    currentTemperature === null
      ? null
      : Math.round(
          currentTemperature,
        )

  // =====================================================
  // VISUAL WATER LEVEL
  // =====================================================

  const visualWaterLevel =
    getVisualWaterLevel(
      waterLevel,
      currentLevel.containerShape,
    )

  const targetMinimum =
    Math.max(
      currentLevel.target -
        currentLevel.tolerance,
      0,
    )

  const targetMaximum =
    Math.min(
      currentLevel.target +
        currentLevel.tolerance,
      100,
    )

  const visualTargetMinimum =
    getVisualWaterLevel(
      targetMinimum,
      currentLevel.containerShape,
    )

  const visualTargetMaximum =
    getVisualWaterLevel(
      targetMaximum,
      currentLevel.containerShape,
    )

  const visualTargetHeight =
    Math.max(
      visualTargetMaximum -
        visualTargetMinimum,
      0,
    )

  // =====================================================
  // FINAL GLASS TRANSFORM
  // =====================================================

  const finalGlassX =
    containerMotion.x +
    frogInterference.glassOffsetX +
    warriorInterference.glassOffsetX +
    survivorInterference.glassOffsetX

  const finalGlassY =
    containerMotion.y +
    frogInterference.glassOffsetY +
    warriorInterference.glassOffsetY +
    survivorInterference.glassOffsetY

  const finalGlassRotation =
    containerMotion.rotation +
    frogInterference.glassRotation +
    warriorInterference.glassRotation +
    survivorInterference.glassRotation

  const hasGlassMovement =
    finalGlassX !== 0 ||
    finalGlassY !== 0 ||
    finalGlassRotation !== 0

  // =====================================================
  // GAME COMPLETE SCREEN
  // =====================================================

  if (gameComplete) {
    return (
      <main className="app">
        <section className="game-card">
          <p className="eyebrow">
            ALL WORLDS COMPLETE
          </p>

          <h1 className="game-title">
            DON'T OVERFLOW!
          </h1>

          <p className="game-subtitle">
            You mastered every drop.
          </p>

          <ResultFeedback
            result="PERFECT"
            levelFailed={false}
          />

          <button
            className="fill-button"
            type="button"
            onClick={() => {
              setGameComplete(false)
              loadLevel(0)
            }}
          >
            PLAY AGAIN
          </button>
        </section>
      </main>
    )
  }

  // =====================================================
  // WORLD COMPLETE SCREEN
  // =====================================================

  if (worldComplete) {
    return (
      <main className="app">
        <section className="game-card">
          <p className="eyebrow">
            WORLD {currentLevel.world}
          </p>

          <h1 className="game-title">
            WORLD COMPLETE!
          </h1>

          <p className="game-subtitle">
            You survived every level
            in this world.
          </p>

          <ResultFeedback
            result="PERFECT"
            levelFailed={false}
          />

          <button
            className="fill-button"
            type="button"
            onClick={goToNextWorld}
          >
            NEXT WORLD
          </button>
        </section>
      </main>
    )
  }

  // =====================================================
  // LEVEL SUCCESS SCREEN
  // =====================================================

  if (levelSucceeded) {
    return (
      <main className="app">
        <section className="game-card">
          <p className="eyebrow">
            WORLD {currentLevel.world} •
            LEVEL {currentLevel.id}
          </p>

          <h1 className="game-title">
            {result === 'PERFECT'
              ? 'PERFECT!'
              : 'SUCCESS!'}
          </h1>

          <p className="game-subtitle">
            {currentLevel.name}
          </p>

          <ResultFeedback
            result={result}
            levelFailed={false}
          />

          <div className="debug-state">
            <span>
              final waterLevel:{' '}
              {displayedLevel}
            </span>

            <span>
              target:{' '}
              {currentLevel.target}%
            </span>

            <span>
              result: {result}
            </span>
          </div>

          <button
            className="fill-button"
            type="button"
            onClick={goToNextLevel}
          >
            {isLastLevelOfWorld
              ? 'COMPLETE WORLD'
              : 'NEXT LEVEL'}
          </button>
        </section>
      </main>
    )
  }

  // =====================================================
  // LEVEL FAILED SCREEN
  // =====================================================

  if (levelFailed) {
    return (
      <main className="app">
        <section className="game-card">
          <p className="eyebrow">
            WORLD {currentLevel.world} •
            LEVEL {currentLevel.id}
          </p>

          <h1 className="game-title">
            GAME OVER
          </h1>

          <p className="game-subtitle">
            No attempts remaining.
          </p>

          <ResultFeedback
            result={result}
            levelFailed={true}
          />

          <button
            className="fill-button"
            type="button"
            onClick={restartLevel}
          >
            RESTART LEVEL
          </button>
        </section>
      </main>
    )
  }

  // =====================================================
  // MAIN GAME SCREEN
  // =====================================================

  return (
    <main className="app">
      {/* =================================================
          DEV MENU
          ================================================= */}

      <div className="dev-menu">
        <button
          className="dev-menu-toggle"
          type="button"
          onClick={() =>
            setDevMenuOpen(
              (open) => !open,
            )
          }
        >
          DEV
        </button>

        {devMenuOpen && (
          <div className="dev-menu-panel">
            <div className="dev-menu-header">
              <span>
                LEVEL SELECT
              </span>

              <button
                type="button"
                onClick={() =>
                  setDevMenuOpen(false)
                }
              >
                ×
              </button>
            </div>

            <div className="dev-world-selector">
              {Array.from(
                {
                  length: 15,
                },
                (_, index) =>
                  index + 1,
              ).map((world) => (
                <button
                  key={world}
                  type="button"
                  className={
                    devWorld === world
                      ? 'dev-world-active'
                      : ''
                  }
                  onClick={() =>
                    setDevWorld(world)
                  }
                >
                  W{world}
                </button>
              ))}
            </div>

            <div className="dev-level-selector">
              {levels
                .filter(
                  (level) =>
                    level.world ===
                    devWorld,
                )
                .map((level) => (
                  <button
                    key={`${level.world}-${level.id}`}
                    type="button"
                    onClick={() =>
                      jumpToDevLevel(
                        level.world,
                        level.id,
                      )
                    }
                  >
                    {level.world}.
                    {level.id}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* =================================================
          WORLD 12 — BLACKOUT
          ================================================= */}

      {hasSurvivors &&
        survivorInterference.isBlackout && (
          <div
            className="survivor-blackout"
            style={{
              opacity:
                survivorInterference.blackoutOpacity,
            }}
            aria-hidden="true"
          />
        )}

      <section className="game-card">
        {/* ===============================================
            WORLD 13 — MUD
            =============================================== */}

        {hasMud &&
          mudInterference.isActive && (
            <MudField
              splashCount={
                mudInterference.visibleSplashes
              }
              coverage={
                mudInterference.coverage
              }
              intensity={
                mudInterference.intensity
              }
              megaSplash={
                mudMegaSplash
              }
            />
          )}

        {/* ===============================================
            LEVEL HEADER
            =============================================== */}

        <p className="eyebrow">
          WORLD {currentLevel.world} • LEVEL{' '}
          {currentLevel.id}
        </p>

        <h1 className="game-title">
          DON'T OVERFLOW!
        </h1>

        <p className="game-subtitle">
          {currentLevel.name}
        </p>

        <div className="level-info">
          <p className="level-instruction">
            {currentLevel.instruction}
          </p>

          <div className="attempts-counter">
            ATTEMPTS {attemptsLeft}/
            {currentLevel.attempts}
          </div>
        </div>

        {/* ===============================================
            WORLD 3 — TIMER
            =============================================== */}

        {hasTimeLimit && (
          <div
            className={`timer-display ${
              timerStarted
                ? 'timer-running'
                : 'timer-ready'
            } ${
              timeLeft !== null &&
              timeLeft <= 1
                ? 'timer-danger'
                : ''
            }`}
          >
            <span className="timer-label">
              TIME
            </span>

            <span className="timer-value">
              {displayedTime}s
            </span>
          </div>
        )}

        {/* ===============================================
            WORLD 4 — WATER RESERVE
            =============================================== */}

        {hasWaterReserve &&
          waterReserve !== null &&
          maximumWaterReserve !== null && (
            <div className="reserve-panel">
              <div className="reserve-header">
                <span className="reserve-label">
                  WATER RESERVE
                </span>

                <span className="reserve-value">
                  {displayedReserve}%
                </span>
              </div>

              <div className="reserve-track">
                <div
                  className="reserve-fill"
                  style={{
                    width:
                      `${reservePercentage}%`,
                  }}
                />
              </div>
            </div>
          )}

        {/* ===============================================
            WORLD 5 — TEMPERATURE
            =============================================== */}

        {hasEnvironment &&
          displayedTemperature !== null && (
            <div className="temperature-panel">
              <div className="temperature-header">
                <span className="temperature-label">
                  TEMPERATURE
                </span>

                <span className="temperature-value">
                  {displayedTemperature}°C
                </span>
              </div>

              <div className="temperature-scale">
                <span>COLD</span>

                <div className="temperature-track">
                  <div
                    className="temperature-fill"
                    style={{
                      width:
                        `${temperaturePercentage}%`,
                    }}
                  />

                  <div
                    className="temperature-marker"
                    style={{
                      left:
                        `${temperaturePercentage}%`,
                    }}
                  />
                </div>

                <span>HOT</span>
              </div>

              <div className="evaporation-info">
                EVAPORATION{' '}
                {currentEvaporationRate.toFixed(1)}
                % / s
              </div>
            </div>
          )}

        {/* ===============================================
            WORLD 6 — OBSTACLES
            =============================================== */}

        {hasObstacles && (
          <div
            className={`obstacle-panel ${
              obstacleEffect.isBlockingFlow
                ? 'obstacle-panel-active'
                : ''
            }`}
          >
            <div className="obstacle-panel-header">
              <span className="obstacle-panel-label">
                FLOW OBSTACLES
              </span>

              <span className="obstacle-panel-value">
                {obstacleEffect.isBlockingFlow
                  ? 'DISRUPTED'
                  : 'CLEAR'}
              </span>
            </div>

            <div className="obstacle-flow-info">
              FLOW{' '}
              {Math.round(
                obstacleEffect.flowMultiplier *
                  100,
              )}
              %
            </div>
          </div>
        )}

        {/* ===============================================
            WORLD 7 — MOTION
            =============================================== */}

        {hasMotion && (
          <div className="motion-panel">
            <div className="motion-panel-header">
              <span className="motion-panel-label">
                CONTAINER MOTION
              </span>

              <span className="motion-panel-value">
                {motionMode.toUpperCase()}
              </span>
            </div>

            <div className="motion-info">
              AMPLITUDE {motionAmplitude}px • SPEED{' '}
              {motionSpeed.toFixed(1)}
            </div>
          </div>
        )}

        {/* ===============================================
            WORLD 8 — FROGS
            =============================================== */}

        {hasFrogs && (
          <div className="motion-panel">
            <div className="motion-panel-header">
              <span className="motion-panel-label">
                FROG INVASION
              </span>

              <span className="motion-panel-value">
                {frogInterference.frogsInGlass} 🐸
              </span>
            </div>

            <div className="motion-info">
              EVENTS{' '}
              {frogInterference.triggeredEvents}/
              {frogTriggerTimes.length}
            </div>
          </div>
        )}

        {/* ===============================================
            LIVE STATUS
            =============================================== */}

        {isInertiaActive && (
          <div className="inertia-status">
            WATER STILL FLOWING...
          </div>
        )}

        {isEvaporating && (
          <div className="evaporation-status">
            EVAPORATING...
          </div>
        )}

        {hasObstacles &&
          obstacleEffect.isBlockingFlow &&
          isFilling && (
            <div className="obstacle-status">
              FLOW DISRUPTED
            </div>
          )}

        {/* ===============================================
            GLASS / CONTAINER
            =============================================== */}

        <div className="container">
          <div
            className={`glass glass-${currentLevel.containerShape} ${
              hasGlassMovement
                ? 'glass-motion'
                : ''
            }`}
            style={{
              ...(hasGlassMovement
                ? {
                    transform: `translate(${finalGlassX}px, ${finalGlassY}px) rotate(${finalGlassRotation}deg)`,
                  }
                : {}),

              opacity:
                warriorInterference.isGlassHidden
                  ? 0
                  : 1,

              transition:
                warriorInterference.isGlassHidden
                  ? 'opacity 0.12s ease'
                  : undefined,
            }}
          >
            {/* ===========================================
                WATER
                =========================================== */}

            <div
              className="water"
              style={{
                height: `${Math.min(
                  visualWaterLevel,
                  100,
                )}%`,
              }}
            />

            {/* ===========================================
                TARGET ZONE
                =========================================== */}

            {currentLevel.showTargetZone && (
              <div
                className="target-zone"
                style={{
                  bottom:
                    `${visualTargetMinimum}%`,
                  height:
                    `${visualTargetHeight}%`,
                }}
              >
                <span>TARGET</span>
              </div>
            )}

            {/* ===========================================
                WORLD 6 — OBSTACLES
                =========================================== */}

            {hasObstacles && (
              <ObstacleField
                positions={
                  obstacleEffect.activePositions
                }
                isBlockingFlow={
                  obstacleEffect.isBlockingFlow
                }
                moving={
                  obstacleMode ===
                  'moving'
                }
                blindSpotSize={
                  blindSpotSize
                }
              />
            )}

            {/* ===========================================
                WORLD 8 — FROG INVASION
                =========================================== */}

            {hasFrogs && (
              <FrogField
                frogCount={
                  frogInterference.frogsInGlass
                }
                obstruction={
                  frogInterference.visualObstruction
                }
              />
            )}
          </div>

          {/* =============================================
              WORLD 11 — WARRIORS
              ============================================= */}

          {hasWarriors && (
            <WarriorField
              mode={warriorMode}
              triggeredEvents={
                warriorInterference.triggeredEvents
              }
              visible={
                warriorInterference.isWarriorVisible
              }
              progress={
                warriorInterference.warriorProgress
              }
              obstruction={
                warriorInterference.visualObstruction
              }
              glassHidden={
                warriorInterference.isGlassHidden
              }
            />
          )}
        </div>

        {/* ===============================================
            PERCENTAGE
            =============================================== */}

        {currentLevel.showPercentage && (
          <p className="percentage">
            {displayedLevel}%
          </p>
        )}

        {/* ===============================================
            RESULT
            =============================================== */}

        {result !== 'waiting' && (
          <p className="result">
            {result}
          </p>
        )}

        {/* ===============================================
            MAIN ACTION BUTTON
            =============================================== */}

        {result === 'waiting' ? (
          <button
            className="fill-button"
            type="button"
            disabled={
              isInertiaActive ||
              isEvaporating
            }
            onPointerDown={
              pointerDown
            }
            onPointerUp={
              pointerUp
            }
            onPointerCancel={
              pointerUp
            }
          >
            {isInertiaActive
              ? 'WATER STILL FLOWING...'
              : isEvaporating
                ? 'EVAPORATING...'
                : 'HOLD TO FILL'}
          </button>
        ) : (
          <button
            className="fill-button"
            type="button"
            onClick={
              retryLevel
            }
          >
            TRY AGAIN
          </button>
        )}

        {/* ===============================================
            PLAYER HINT
            =============================================== */}

        <p className="hint">
          {isInertiaActive
            ? 'You released the button, but momentum is still pushing water.'
            : isEvaporating
              ? 'Wait for evaporation to finish before the final result.'
              : result === 'waiting'
                ? hasFrogs
                  ? frogMode ===
                    'in-out'
                    ? frogInterference.frogsInGlass >
                      0
                      ? 'The frog is inside • Remember that it can jump back out'
                      : frogInterference.triggeredEvents >=
                          2
                        ? 'The frog escaped • The water level dropped again'
                        : 'Keep pouring • A frog is about to interfere'
                    : frogInterference.isActive
                      ? 'Frogs displace water • Adapt before you release'
                      : 'Keep pouring • The frogs are coming'
                  : hasObstacles
                    ? obstacleEffect.isBlockingFlow
                      ? 'Obstacle contact • The water flow is currently disrupted'
                      : blindSpotSize >
                          0
                        ? 'Obstacles alter the flow • Hidden areas force you to estimate the level'
                        : obstacleMode ===
                            'moving'
                          ? 'The barrier moves • Its position changes the flow in real time'
                          : 'Obstacles alter the flow • Adapt your timing'
                    : hasEnvironment
                      ? 'Heat causes evaporation • Anticipate the water loss'
                      : hasTimeLimit &&
                          !timerStarted
                        ? 'The timer starts when you begin filling.'
                        : hasWaterReserve
                          ? hasInertia
                            ? 'Every drop counts • Release early to anticipate momentum'
                            : 'Every drop counts • Your reserve carries across attempts'
                          : hasMotion
                            ? 'The container moves • Keep control of your timing'
                            : 'Hold to fill • Release to stop'
                : 'Try again before you run out of attempts.'}
        </p>

        {/* ===============================================
            DEBUG / OBSERVABLE GAME STATE
            =============================================== */}

        <div className="debug-state">
          <span>
            world:{' '}
            {currentLevel.world}
          </span>

          <span>
            level:{' '}
            {currentLevel.id}
          </span>

          <span>
            shape:{' '}
            {currentLevel.containerShape}
          </span>

          <span>
            flowType:{' '}
            {currentLevel.flowType}
          </span>

          <span>
            real waterLevel:{' '}
            {displayedLevel}
          </span>

          <span>
            visual waterLevel:{' '}
            {Math.round(
              visualWaterLevel,
            )}
          </span>

          <span>
            target:{' '}
            {currentLevel.target}%
          </span>

          <span>
            tolerance: ±
            {currentLevel.tolerance}%
          </span>

          <span>
            attempts:{' '}
            {attemptsLeft}/
            {currentLevel.attempts}
          </span>

          <span>
            baseSpeed:{' '}
            {currentLevel.fillSpeed}
          </span>

          <span>
            normalFlowSpeed:{' '}
            {baseFlowSpeed.toFixed(
              1,
            )}
          </span>

          <span>
            effectiveSpeed:{' '}
            {currentFlowSpeed.toFixed(
              1,
            )}
          </span>

          <span>
            elapsedTime:{' '}
            {elapsedTime.toFixed(
              2,
            )}
            s
          </span>

          <span>
            timeLimit:{' '}
            {currentLevel.timeLimit ??
              'none'}
          </span>

          <span>
            waterReserve:{' '}
            {waterReserve === null
              ? 'none'
              : waterReserve.toFixed(
                  1,
                )}
          </span>

          <span>
            inertia:{' '}
            {currentLevel.inertia}s
          </span>

          <span>
            inertiaActive:{' '}
            {String(
              isInertiaActive,
            )}
          </span>

          <span>
            temperature:{' '}
            {currentTemperature ===
            null
              ? 'none'
              : `${currentTemperature.toFixed(
                  1,
                )}°C`}
          </span>

          <span>
            evaporationRate:{' '}
            {hasEnvironment
              ? `${currentEvaporationRate.toFixed(
                  2,
                )}%/s`
              : 'none'}
          </span>

          <span>
            evaporationActive:{' '}
            {String(
              isEvaporating,
            )}
          </span>

          <span>
            obstacleMode:{' '}
            {hasObstacles
              ? obstacleMode
              : 'none'}
          </span>

          <span>
            obstacleStrength:{' '}
            {hasObstacles
              ? obstacleStrength.toFixed(
                  2,
                )
              : 'none'}
          </span>

          <span>
            obstacleMultiplier:{' '}
            {hasObstacles
              ? obstacleEffect.flowMultiplier.toFixed(
                  2,
                )
              : 'none'}
          </span>

          <span>
            obstacleBlocking:{' '}
            {String(
              obstacleEffect.isBlockingFlow,
            )}
          </span>

          <span>
            obstaclePositions:{' '}
            {hasObstacles
              ? obstacleEffect.activePositions
                  .map(
                    (
                      position,
                    ) =>
                      position.toFixed(
                        1,
                      ),
                  )
                  .join(', ')
              : 'none'}
          </span>

          <span>
            blindSpot:{' '}
            {hasObstacles
              ? `${blindSpotSize}%`
              : 'none'}
          </span>

          <span>
            motionMode:{' '}
            {hasMotion
              ? motionMode
              : 'none'}
          </span>

          <span>
            motionAmplitude:{' '}
            {hasMotion
              ? `${motionAmplitude}px`
              : 'none'}
          </span>

          <span>
            motionSpeed:{' '}
            {hasMotion
              ? motionSpeed.toFixed(
                  1,
                )
              : 'none'}
          </span>

          <span>
            frogMode:{' '}
            {hasFrogs
              ? frogMode
              : 'none'}
          </span>

          <span>
            frogEvents:{' '}
            {hasFrogs
              ? `${frogInterference.triggeredEvents}/${frogTriggerTimes.length}`
              : 'none'}
          </span>

          <span>
            frogsInGlass:{' '}
            {hasFrogs
              ? frogInterference.frogsInGlass
              : 'none'}
          </span>

          <span>
            frogWaterOffset:{' '}
            {hasFrogs
              ? frogInterference.waterOffset.toFixed(
                  1,
                )
              : 'none'}
          </span>

          <span>
            frogObstruction:{' '}
            {hasFrogs
              ? `${frogInterference.visualObstruction}%`
              : 'none'}
          </span>

          <span>
            warriorMode:{' '}
            {hasWarriors
              ? warriorMode
              : 'none'}
          </span>

          <span>
            warriorEvents:{' '}
            {hasWarriors
              ? `${warriorInterference.triggeredEvents}/${warriorTriggerTimes.length}`
              : 'none'}
          </span>

          <span>
            survivorMode:{' '}
            {hasSurvivors
              ? survivorMode
              : 'none'}
          </span>

          <span>
            survivorEvents:{' '}
            {hasSurvivors
              ? `${survivorInterference.triggeredEvents}/${survivorTriggerTimes.length}`
              : 'none'}
          </span>

          <span>
            survivorPressure:{' '}
            {hasSurvivors
              ? survivorInterference.flowMultiplier.toFixed(
                  2,
                )
              : 'none'}
          </span>

          <span>
            mudMode:{' '}
            {hasMud
              ? mudMode
              : 'none'}
          </span>

          <span>
            mudSplashes:{' '}
            {hasMud
              ? `${mudInterference.triggeredSplashes}/${mudTriggerTimes.length}`
              : 'none'}
          </span>

          <span>
            mudCoverage:{' '}
            {hasMud
              ? `${mudInterference.coverage.toFixed(
                  1,
                )}%`
              : 'none'}
          </span>

          <span>
            mudMegaSplash:{' '}
            {String(
              mudMegaSplash,
            )}
          </span>

          <span>
            isFilling:{' '}
            {String(
              isFilling,
            )}
          </span>

          <span>
            result:{' '}
            {result}
          </span>
        </div>
      </section>
    </main>
  )
}

export default App