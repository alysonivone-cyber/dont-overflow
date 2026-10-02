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

import type { GameResult } from './game/types'

import ResultFeedback from './components/ResultFeedback'
import ObstacleField from './components/ObstacleField'
import FrogField from './components/FrogField'

import {
  playSuccessSound,
  playErrorSound,
  playGameOverSound,
} from './game/soundManager'

function App() {
  // =====================================================
  // CORE GAME STATE
  // =====================================================

  const [currentLevelIndex, setCurrentLevelIndex] =
    useState(0)

  const currentLevel = levels[currentLevelIndex]

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

  const waterLevelRef = useRef(0)

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
          liveObstacleEffect.flowMultiplier

        const amountToAdd =
          effectiveSpeed / 100

        if (
          !hasWaterReserve
        ) {
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

        if (
          nextReserve <= 0
        ) {
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
    worldComplete,
    gameComplete,
    levelSucceeded,
    levelFailed,
    result,
  ])

    // =====================================================
  // GLOBAL ELAPSED-TIME CLOCK
  // Worlds 3, 6, 7 and 8 use elapsed time
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

    return () => {
      window.clearInterval(
        timerInterval,
      )
    }
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
      !timerStarted ||
      result !== 'waiting' ||
      timeLeft === null ||
      timeLeft > 0
    ) {
      return
    }

    setTimerStarted(false)
    setIsFilling(false)

    if (
      isInertiaActive ||
      isEvaporating
    ) {
      return
    }

    startEvaporationOrFinish(
      waterLevelRef.current,
    )
  }, [
    hasTimeLimit,
    timerStarted,
    timeLeft,
    result,
    isInertiaActive,
    isEvaporating,
  ])

  // =====================================================
  // WORLD 5 — COOLING
  // =====================================================

  useEffect(() => {
    if (
      !hasEnvironment ||
      currentLevel.temperatureMode !==
        'cooling' ||
      currentTemperature === null ||
      result !== 'waiting' ||
      worldComplete ||
      gameComplete
    ) {
      return
    }

    const coolingInterval =
      window.setInterval(() => {
        setCurrentTemperature(
          (temperature) => {
            if (
              temperature === null
            ) {
              return null
            }

            const nextTemperature =
              Math.max(
                temperature - 0.25,
                25,
              )

            temperatureRef.current =
              nextTemperature

            return nextTemperature
          },
        )
      }, 100)

    return () => {
      window.clearInterval(
        coolingInterval,
      )
    }
  }, [
    hasEnvironment,
    currentLevel.temperatureMode,
    currentTemperature,
    result,
    worldComplete,
    gameComplete,
  ])

  // =====================================================
  // WORLD 4 — INERTIA WATER FLOW
  // =====================================================

  useEffect(() => {
    if (
      !isInertiaActive ||
      inertiaTimeLeft <= 0 ||
      result !== 'waiting' ||
      worldComplete ||
      gameComplete ||
      levelSucceeded ||
      levelFailed
    ) {
      return
    }

    const interval =
      window.setInterval(() => {
        const currentWater =
          waterLevelRef.current

        const inertiaProgress =
          currentLevel.inertia > 0
            ? Math.max(
                inertiaTimeLeft /
                  currentLevel.inertia,
                0,
              )
            : 0

        const normalInertiaSpeed =
          currentLevel.fillSpeed *
          0.55 *
          inertiaProgress

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

        const inertiaSpeed =
          normalInertiaSpeed *
          liveObstacleEffect.flowMultiplier

        const amountToAdd =
          inertiaSpeed / 100

        if (
          !hasWaterReserve
        ) {
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

        if (
          nextReserve <= 0
        ) {
          setIsInertiaActive(
            false,
          )

          setInertiaTimeLeft(0)

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
    isInertiaActive,
    inertiaTimeLeft,
    currentLevel.inertia,
    currentLevel.fillSpeed,
    hasWaterReserve,
    hasObstacles,
    obstacleMode,
    obstacleStrength,
    obstaclePositions,
    obstacleMovementSpeed,
    elapsedTime,
    result,
    worldComplete,
    gameComplete,
    levelSucceeded,
    levelFailed,
  ])

  // =====================================================
  // WORLD 4 — INERTIA COUNTDOWN
  // =====================================================

  useEffect(() => {
    if (
      !isInertiaActive ||
      result !== 'waiting'
    ) {
      return
    }

    const timer =
      window.setInterval(() => {
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
        timer,
      )
    }
  }, [
    isInertiaActive,
    result,
  ])

  // =====================================================
  // WORLD 4 — END INERTIA
  // =====================================================

  useEffect(() => {
    if (
      !isInertiaActive ||
      inertiaTimeLeft > 0 ||
      result !== 'waiting'
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
    result,
  ])

  // =====================================================
  // WORLD 5 — EVAPORATION WATER LOSS
  // =====================================================

  useEffect(() => {
    if (
      !isEvaporating ||
      evaporationTimeLeft <= 0 ||
      result !== 'waiting'
    ) {
      return
    }

    const interval =
      window.setInterval(() => {
        const temperature =
          temperatureRef.current ??
          initialTemperature

        const evaporationRate =
          getEvaporationRate({
            baseRate:
              evaporationBaseRate,
            currentTemperature:
              temperature,
            initialTemperature,
          })

        const amountToRemove =
          evaporationRate / 100

        const nextWater =
          Math.max(
            waterLevelRef.current -
              amountToRemove,
            0,
          )

        waterLevelRef.current =
          nextWater

        setWaterLevel(
          nextWater,
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
    result,
    evaporationBaseRate,
    initialTemperature,
  ])

  // =====================================================
  // WORLD 5 — EVAPORATION COUNTDOWN
  // =====================================================

  useEffect(() => {
    if (
      !isEvaporating ||
      result !== 'waiting'
    ) {
      return
    }

    const interval =
      window.setInterval(() => {
        setEvaporationTimeLeft(
          (currentTime) => {
            const nextTime =
              Math.max(
                currentTime - 0.01,
                0,
              )

            evaporationTimeRef.current =
              nextTime

            return nextTime
          },
        )
      }, 10)

    return () => {
      window.clearInterval(
        interval,
      )
    }
  }, [
    isEvaporating,
    result,
  ])

  // =====================================================
  // WORLD 5 — END EVAPORATION
  // =====================================================

  useEffect(() => {
    if (
      !isEvaporating ||
      evaporationTimeLeft > 0 ||
      result !== 'waiting'
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
    result,
  ])

  // =====================================================
  // PLAYER INPUT — HOLD
  // =====================================================

  const pointerDown = () => {
    if (
      result !== 'waiting' ||
      worldComplete ||
      gameComplete ||
      attemptsLeft <= 0 ||
      isInertiaActive ||
      isEvaporating
    ) {
      return
    }

    if (
      hasWaterReserve &&
      (waterReserveRef.current ??
        0) <= 0
    ) {
      startEvaporationOrFinish(
        waterLevelRef.current,
      )

      return
    }

    if (!timerStarted) {
      setTimerStarted(true)
    }

    setIsFilling(true)
  }

  // =====================================================
  // PLAYER INPUT — RELEASE
  // =====================================================

  const pointerUp = () => {
    if (
      !isFilling ||
      result !== 'waiting' ||
      worldComplete ||
      gameComplete
    ) {
      return
    }

    setIsFilling(false)

    if (
      hasTimeLimit ||
      hasMotion ||
      hasFrogs
    ) {
      setTimerStarted(false)
    }

    if (hasInertia) {
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
    setIsFilling(false)

    setWaterLevel(0)
    waterLevelRef.current = 0

    setResult('waiting')

    setElapsedTime(0)
    setTimerStarted(false)

    appliedFrogOffsetRef.current =
      0

    setIsInertiaActive(false)
    setInertiaTimeLeft(0)

    setIsEvaporating(false)
    setEvaporationTimeLeft(0)

    evaporationTimeRef.current =
      0

    const resetTemperature =
      currentLevel.temperature ??
      null

    setCurrentTemperature(
      resetTemperature,
    )

    temperatureRef.current =
      resetTemperature
  }

  // =====================================================
  // TRY AGAIN
  // =====================================================

  const retryLevel = () => {
    if (attemptsLeft <= 0) {
      return
    }

    resetAttemptState()
  }

  // =====================================================
  // RESTART LEVEL
  // =====================================================

  const restartLevel = () => {
    resetAttemptState()

    setAttemptsLeft(
      currentLevel.attempts,
    )

    setWaterReserve(
      currentLevel.waterReserve,
    )

    waterReserveRef.current =
      currentLevel.waterReserve
  }

  // =====================================================
  // LOAD A LEVEL
  // =====================================================

  const loadLevel = (
    newLevelIndex: number,
  ) => {
    const newLevel =
      levels[newLevelIndex]

    setCurrentLevelIndex(
      newLevelIndex,
    )

    setIsFilling(false)

    setWaterLevel(0)
    waterLevelRef.current = 0

    setResult('waiting')

    setElapsedTime(0)
    setTimerStarted(false)

    appliedFrogOffsetRef.current =
      0

    setIsInertiaActive(false)
    setInertiaTimeLeft(0)

    setIsEvaporating(false)
    setEvaporationTimeLeft(0)

    evaporationTimeRef.current =
      0

    setAttemptsLeft(
      newLevel.attempts,
    )

    setWaterReserve(
      newLevel.waterReserve,
    )

    waterReserveRef.current =
      newLevel.waterReserve

    const newTemperature =
      newLevel.temperature ??
      null

    setCurrentTemperature(
      newTemperature,
    )

    temperatureRef.current =
      newTemperature
  }

  // =====================================================
  // NEXT LEVEL
  // =====================================================

  const nextLevel = () => {
    const newLevelIndex =
      currentLevelIndex + 1

    const newLevel =
      levels[newLevelIndex]

    if (!newLevel) {
      setIsFilling(false)
      setIsInertiaActive(false)
      setIsEvaporating(false)

      setGameComplete(true)

      return
    }

    if (
      newLevel.world !==
      currentLevel.world
    ) {
      setIsFilling(false)
      setIsInertiaActive(false)
      setIsEvaporating(false)

      setWorldComplete(true)

      return
    }

    loadLevel(
      newLevelIndex,
    )
  }

  // =====================================================
  // NEXT WORLD
  // =====================================================

  const startNextWorld = () => {
    const newLevelIndex =
      currentLevelIndex + 1

    const newLevel =
      levels[newLevelIndex]

    if (!newLevel) {
      setWorldComplete(false)
      setGameComplete(true)

      return
    }

    loadLevel(
      newLevelIndex,
    )

    setWorldComplete(false)
  }

  // =====================================================
  // RESTART GAME
  // =====================================================

  const restartGame = () => {
    loadLevel(0)

    setWorldComplete(false)
    setGameComplete(false)
  }

    // =====================================================
  // DISPLAYED / VISUAL VALUES
  // =====================================================

  const displayedLevel =
    Math.round(waterLevel)

  const visualWaterLevel =
    getVisualWaterLevel(
      waterLevel,
      currentLevel.containerShape,
    )

  const realTargetMinimum =
    currentLevel.target -
    currentLevel.tolerance

  const realTargetMaximum =
    currentLevel.target +
    currentLevel.tolerance

  const visualTargetMinimum =
    getVisualWaterLevel(
      realTargetMinimum,
      currentLevel.containerShape,
    )

  const visualTargetMaximum =
    getVisualWaterLevel(
      realTargetMaximum,
      currentLevel.containerShape,
    )

  const visualTargetHeight =
    visualTargetMaximum -
    visualTargetMinimum

  const displayedTime =
    timeLeft === null
      ? null
      : timeLeft.toFixed(1)

  const displayedReserve =
    waterReserve === null
      ? null
      : Math.max(
          waterReserve,
          0,
        ).toFixed(0)

  const displayedTemperature =
    currentTemperature === null
      ? null
      : Math.round(
          currentTemperature,
        )

  // =====================================================
  // WORLDS 7 + 8 — FINAL GLASS TRANSFORM
  // =====================================================

  const finalGlassX =
    containerMotion.x +
    frogInterference.glassOffsetX

  const finalGlassY =
    containerMotion.y +
    frogInterference.glassOffsetY

  const finalGlassRotation =
    containerMotion.rotation +
    frogInterference.glassRotation

  const hasGlassMovement =
    hasMotion ||
    frogInterference.glassOffsetX !== 0 ||
    frogInterference.glassOffsetY !== 0 ||
    frogInterference.glassRotation !== 0

  // =====================================================
  // GAME COMPLETE SCREEN
  // =====================================================

  if (gameComplete) {
    return (
      <main className="game">
        <section className="game-card world-complete">
          <p className="eyebrow">
            ALL WORLDS COMPLETE
          </p>

          <h1 className="game-title">
            DON'T OVERFLOW!
          </h1>

          <p className="game-subtitle">
            GAME COMPLETE!
          </p>

          <p className="level-instruction">
            You mastered every available challenge.
          </p>

          <button
            className="fill-button"
            type="button"
            onClick={restartGame}
          >
            REPLAY GAME
          </button>
        </section>
      </main>
    )
  }

  // =====================================================
  // WORLD COMPLETE SCREEN
  // =====================================================

  if (worldComplete) {
    const worldMasteryTitle =
      currentLevel.world === 1
        ? 'CALIBRATION MASTERED!'
        : currentLevel.world === 2
          ? 'PERCEPTION MASTERED!'
          : currentLevel.world === 3
            ? 'PRESSURE MASTERED!'
            : currentLevel.world === 4
              ? 'CONTROL MASTERED!'
              : currentLevel.world === 5
                ? 'ENVIRONMENT MASTERED!'
                : currentLevel.world === 6
                  ? 'OBSTACLES MASTERED!'
                  : currentLevel.world === 7
                    ? 'MOTION MASTERED!'
                    : currentLevel.world === 8
                      ? 'FROG INVASION SURVIVED!'
                      : 'WORLD MASTERED!'

    return (
      <main className="game">
        <section className="game-card world-complete">
          <p className="eyebrow">
            WORLD {currentLevel.world} COMPLETE
          </p>

          <h1 className="game-title">
            {worldMasteryTitle}
          </h1>

          <p className="game-subtitle">
            You completed World{' '}
            {currentLevel.world}.
          </p>

          <p className="level-instruction">
            A new challenge is waiting for you.
          </p>

          <button
            className="fill-button"
            type="button"
            onClick={startNextWorld}
          >
            START WORLD{' '}
            {nextLevelConfig?.world}
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
      <main className="game">
        <section className="game-card result-screen">
          <p className="eyebrow">
            WORLD {currentLevel.world} • LEVEL{' '}
            {currentLevel.id}
          </p>

          <h1 className="game-title">
            DON'T OVERFLOW!
          </h1>

          <ResultFeedback
            result={result}
            levelFailed={false}
          />

          <div className="success-details">
            <p className="game-subtitle">
              LEVEL {currentLevel.id} COMPLETE
            </p>

            <p className="level-instruction">
              You stopped at {displayedLevel}%.
              {' '}
              Target: {currentLevel.target}% ±
              {currentLevel.tolerance}%.
            </p>
          </div>

          {hasWaterReserve &&
            displayedReserve !== null && (
              <p className="reserve-result">
                Water remaining:{' '}
                {displayedReserve}%
              </p>
            )}

          <button
            className="fill-button"
            type="button"
            onClick={nextLevel}
          >
            {isLastLevelOfWorld
              ? 'COMPLETE WORLD'
              : 'NEXT LEVEL'}
          </button>

          <p className="hint">
            {result === 'PERFECT'
              ? 'Bullseye! You hit the exact target.'
              : 'Target reached! Ready for the next challenge.'}
          </p>
        </section>
      </main>
    )
  }

  // =====================================================
  // LEVEL FAILED SCREEN
  // =====================================================

  if (levelFailed) {
    return (
      <main className="game">
        <section className="game-card result-screen">
          <p className="eyebrow">
            WORLD {currentLevel.world} • LEVEL{' '}
            {currentLevel.id}
          </p>

          <h1 className="game-title">
            DON'T OVERFLOW!
          </h1>

          <ResultFeedback
            result={result}
            levelFailed={true}
          />

          <div className="attempts-counter">
            ATTEMPTS 0/
            {currentLevel.attempts}
          </div>

          <button
            className="fill-button"
            type="button"
            onClick={restartLevel}
          >
            RESTART LEVEL
          </button>

          <p className="hint">
            Restart this level with{' '}
            {currentLevel.attempts} new attempts
            {hasWaterReserve
              ? ' and a full water reserve.'
              : '.'}
          </p>
        </section>
      </main>
    )
  }

  // =====================================================
  // MAIN GAME SCREEN
  // =====================================================

  return (
    <main className="game">
      <section className="game-card">
        {/* =================================================
            LEVEL HEADER
            ================================================= */}

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

        {/* =================================================
            WORLD 3 — TIMER
            ================================================= */}

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

        {/* =================================================
            WORLD 4 — WATER RESERVE
            ================================================= */}

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

        {/* =================================================
            WORLD 5 — TEMPERATURE
            ================================================= */}

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

        {/* =================================================
            WORLD 6 — OBSTACLE INFORMATION
            ================================================= */}

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

        {/* =================================================
            WORLD 7 — MOTION INFORMATION
            ================================================= */}

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

        {/* =================================================
            WORLD 8 — FROG INFORMATION
            ================================================= */}

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

        {/* =================================================
            LIVE STATUS
            ================================================= */}

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

        {/* =================================================
            GLASS / CONTAINER
            ================================================= */}

        <div className="container">
          <div
            className={`glass glass-${currentLevel.containerShape} ${
              hasGlassMovement
                ? 'glass-motion'
                : ''
            }`}
            style={
              hasGlassMovement
                ? {
                    transform: `translate(${finalGlassX}px, ${finalGlassY}px) rotate(${finalGlassRotation}deg)`,
                  }
                : undefined
            }
          >
            {/* =============================================
                WATER
                ============================================= */}

            <div
              className="water"
              style={{
                height: `${Math.min(
                  visualWaterLevel,
                  100,
                )}%`,
              }}
            />

            {/* =============================================
                TARGET ZONE
                ============================================= */}

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

            {/* =============================================
                WORLD 6 — OBSTACLES
                ============================================= */}

            {hasObstacles && (
              <ObstacleField
                positions={
                  obstacleEffect.activePositions
                }
                isBlockingFlow={
                  obstacleEffect.isBlockingFlow
                }
                moving={
                  obstacleMode === 'moving'
                }
                blindSpotSize={
                  blindSpotSize
                }
              />
            )}

            {/* =============================================
                WORLD 8 — FROG INVASION
                ============================================= */}

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
        </div>

        {/* =================================================
            PERCENTAGE
            ================================================= */}

        {currentLevel.showPercentage && (
          <p className="percentage">
            {displayedLevel}%
          </p>
        )}

        {/* =================================================
            RESULT
            ================================================= */}

        {result !== 'waiting' && (
          <p className="result">
            {result}
          </p>
        )}

        {/* =================================================
            MAIN ACTION BUTTON
            ================================================= */}

        {result === 'waiting' ? (
          <button
            className="fill-button"
            type="button"
            disabled={
              isInertiaActive ||
              isEvaporating
            }
            onPointerDown={pointerDown}
            onPointerUp={pointerUp}
            onPointerCancel={pointerUp}
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
            onClick={retryLevel}
          >
            TRY AGAIN
          </button>
        )}

        {/* =================================================
            PLAYER HINT
            ================================================= */}

        <p className="hint">
          {isInertiaActive
            ? 'You released the button, but momentum is still pushing water.'
            : isEvaporating
              ? 'Wait for evaporation to finish before the final result.'
              : result === 'waiting'
                ? hasFrogs
                  ? frogMode === 'in-out'
                    ? frogInterference.frogsInGlass > 0
                      ? 'The frog is inside • Remember that it can jump back out'
                      : frogInterference.triggeredEvents >= 2
                        ? 'The frog escaped • The water level dropped again'
                        : 'Keep pouring • A frog is about to interfere'
                    : frogInterference.isActive
                      ? 'Frogs displace water • Adapt before you release'
                      : 'Keep pouring • The frogs are coming'
                  : hasObstacles
                    ? obstacleEffect.isBlockingFlow
                      ? 'Obstacle contact • The water flow is currently disrupted'
                      : blindSpotSize > 0
                        ? 'Obstacles alter the flow • Hidden areas force you to estimate the level'
                        : obstacleMode === 'moving'
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

        {/* =================================================
            DEBUG / OBSERVABLE GAME STATE
            ================================================= */}

        <div className="debug-state">
          <span>
            world: {currentLevel.world}
          </span>

          <span>
            level: {currentLevel.id}
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
            {baseFlowSpeed.toFixed(1)}
          </span>

          <span>
            effectiveSpeed:{' '}
            {currentFlowSpeed.toFixed(1)}
          </span>

          <span>
            elapsedTime:{' '}
            {elapsedTime.toFixed(2)}s
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
              : waterReserve.toFixed(1)}
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
            {currentTemperature === null
              ? 'none'
              : `${currentTemperature.toFixed(1)}°C`}
          </span>

          <span>
            evaporationRate:{' '}
            {hasEnvironment
              ? `${currentEvaporationRate.toFixed(2)}%/s`
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
              ? obstacleStrength.toFixed(2)
              : 'none'}
          </span>

          <span>
            obstacleMultiplier:{' '}
            {hasObstacles
              ? obstacleEffect.flowMultiplier.toFixed(2)
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
                    (position) =>
                      position.toFixed(1),
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
              ? motionSpeed.toFixed(1)
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
              ? frogInterference.waterOffset.toFixed(1)
              : 'none'}
          </span>

          <span>
            frogObstruction:{' '}
            {hasFrogs
              ? `${frogInterference.visualObstruction}%`
              : 'none'}
          </span>

          <span>
            isFilling:{' '}
            {String(isFilling)}
          </span>

          <span>
            result: {result}
          </span>
        </div>
      </section>
    </main>
  )
}

export default App