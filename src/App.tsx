import { useEffect, useEffectEvent, useRef, useState } from 'react'
import './App.css'
import CapybaraWelcome from './components/CapybaraWelcome'
import WorldMapScreen from './components/WorldSelection/WorldMapScreen'
import CapybaraCelebration from './components/CapybaraCelebration'
import CapybaraEnding from './components/CapybaraEnding'

import { levels } from './game/levels'
import {
  loadPlayerProgress,
  savePlayerProgress,
  completeLevel,
} from './game/playerProgress'
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

import GameOutcomeScreen from './components/GameOutcomeScreen'
import GameEffectsOverlay from './components/GameEffectsOverlay'
import GlassStage from './components/GlassStage'
import GameInfoPanel from './components/GameInfoPanel'
import PlayerHint from './components/PlayerHint'
import GameMenuButton from './components/GameMenuButton'
import GameReadout from './components/GameReadout'
import ObstacleField from './components/ObstacleField'
import FrogField from './components/FrogField'
import WarriorField from './components/WarriorField'
import MudField from './components/MudField'
import { FillButton } from './components/UI/FillButton'
import { getEffectiveFlowSpeed } from './game/getEffectiveFlowSpeed'
import {
  playWelcomeMusic,
  playSuccessSound,
  playErrorSound,
  playGameOverSound,
  playMudSplatSound,
  playOverflowSound,
  playFloodSound,
  playBackgroundMusic,
  stopBackgroundMusic,
  playFrogCroakSound,
  playWarriorHornSound,
} from './game/soundManager'

const EMPTY_OBSTACLE_POSITIONS: NonNullable<
  (typeof levels)[number]['obstaclePositions']
> = []

function App() {

  const [showWelcome, setShowWelcome] = useState(true)
  const [showWorldSelection, setShowWorldSelection] =
  useState(false)
  const [selectedWorld, setSelectedWorld] =
  useState<number | null>(null)
  const [showEnding, setShowEnding] = useState(false)
  const [playerProgress, setPlayerProgress] =
  useState(loadPlayerProgress)

  // CORE GAME STATE

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

  // TIMER / PRESSURE STATE

  const [elapsedTime, setElapsedTime] =
    useState(0)

  const [timerStarted, setTimerStarted] =
    useState(false)

  // WATER RESERVE STATE

  const [waterReserve, setWaterReserve] =
    useState<number | null>(
      levels[0].waterReserve,
    )

  // INERTIA STATE

  const [isInertiaActive, setIsInertiaActive] =
    useState(false)

  const inertiaTimeRef = useRef(0)

  // WORLD 5 — ENVIRONMENT STATE

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

  // REFS

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

  // FROG & WARRIOR SOUND TRACKING
    const previousFrogEventsRef = useRef(0)
    const previousWarriorEventsRef = useRef(0)
  
  // FLOOD SOUND — play only once per flood
    const floodSoundPlayedRef =
      useRef(false)

  // WORLD 8 — FROG INVASION REF

  const appliedFrogOffsetRef =
    useRef(0)

  // KEEP REFS SYNCHRONIZED

  useEffect(() => {
    waterLevelRef.current =
      waterLevel
  }, [waterLevel])

// FLOOD SOUND — FULL-SCREEN WATER

useEffect(() => {
  // Flood animation begins above 110%.
  if (
    waterLevel > 110 &&
    !floodSoundPlayedRef.current
  ) {
    floodSoundPlayedRef.current = true
    playFloodSound()
  }

  // Allow the sound to play again
  // when starting a new attempt.
  if (waterLevel <= 100) {
    floodSoundPlayedRef.current = false
  }
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

// PLAYER PROGRESS — AUTO SAVE

useEffect(() => {
  savePlayerProgress(playerProgress)
}, [playerProgress])

  // LEVEL STATUS

  const levelSucceeded =
    result === 'SUCCESS' ||
    result === 'PERFECT'

  const nextLevelConfig =
    levels[currentLevelIndex + 1]

  const isLastLevelOfWorld =
    !nextLevelConfig ||
    nextLevelConfig.world !==
      currentLevel.world

  // WORLD 3 — TIMER

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

  // WORLD 4 — WATER RESERVE / INERTIA

  const hasWaterReserve =
    currentLevel.waterReserve !== null

  const reserveExhausted =
  hasWaterReserve &&
  waterReserve !== null &&
  waterReserve <= 0

  const levelFailed =
  !levelSucceeded &&
  (
    attemptsLeft === 0 ||
    (
      reserveExhausted &&
      result !== 'waiting'
    )
  )

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

  // WORLD 5 — ENVIRONMENT

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

  // WORLD 6 — OBSTACLES

  const hasObstacles =
    currentLevel.obstacleMode !==
    undefined

  const obstacleMode =
    currentLevel.obstacleMode ??
    'fixed'

  const obstacleStrength =
    currentLevel.obstacleStrength ??
    0

  // Stable fallback avoids restarting timer effects on unrelated renders.
  const obstaclePositions =
    currentLevel.obstaclePositions ??
    EMPTY_OBSTACLE_POSITIONS

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

  // WORLD 7 — MOTION

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

  // WORLD 8 — FROG INVASION

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

  // WORLD 11 — WARRIORS

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

  // WORLD 12 — SURVIVORS

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

  // CURRENT FLOW SPEED

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

  // WORLD 13 — MUD

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

  // WORLD 13 — MUD SOUND

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

// FROG SOUND — EVERY FROG INVASION

useEffect(() => {
  const currentEvents = frogInterference.triggeredEvents

  if (
    hasFrogs &&
    result === 'waiting' &&
    currentEvents > previousFrogEventsRef.current
  ) {
    playFrogCroakSound()
  }

  previousFrogEventsRef.current = currentEvents
}, [
  hasFrogs,
  frogInterference.triggeredEvents,
  result,
])

// WARRIOR SOUND — EVERY WARRIOR APPEARANCE

useEffect(() => {
  const currentEvents = warriorInterference.triggeredEvents

  if (
    hasWarriors &&
    result === 'waiting' &&
    currentEvents > previousWarriorEventsRef.current
  ) {
    playWarriorHornSound()
  }

  previousWarriorEventsRef.current = currentEvents
}, [
  hasWarriors,
  warriorInterference.triggeredEvents,
  result,
])

  // ATTEMPT RESULT HELPERS

  const registerFailure = () => {
    setIsFilling(false)
    setIsInertiaActive(false)
    inertiaTimeRef.current = 0
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
    inertiaTimeRef.current = 0
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
      const earnedStars = evaluatedResult === 'PERFECT' ? 3 : 2
      setPlayerProgress((previous) =>
        completeLevel(previous, currentLevel.world, currentLevel.id, earnedStars),
      )
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
    inertiaTimeRef.current = 0

    setEvaporationTimeLeft(
      evaporationDuration,
    )

    evaporationTimeRef.current =
      evaporationDuration

    setIsEvaporating(true)
  }

  // Effect Events keep interval/timeout callbacks in sync with the
  // latest attempt handlers without restarting the running timers.
  const finishAttemptFromEffect = useEffectEvent(finishAttempt)
  const registerFailureFromEffect = useEffectEvent(registerFailure)
  const startEvaporationOrFinishFromEffect = useEffectEvent(startEvaporationOrFinish)

  // WORLD 8 — APPLY FROG WATER DISPLACEMENT

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

  // WATER FILLING

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
  
    const normalFlowSpeed = getFlowSpeed({
      baseSpeed: currentLevel.fillSpeed,
      flowType: currentLevel.flowType,
      waterLevel: currentWater,
      elapsedTime,
    })

    const liveObstacleEffect = hasObstacles
        ? getObstacleEffect({
          waterLevel: currentWater,
          elapsedTime,
          mode: obstacleMode,
          strength: obstacleStrength,
          positions: obstaclePositions,
          movementSpeed: obstacleMovementSpeed,
        })
      : { flowMultiplier: 1 }

    const isSwampSurprise =
      currentLevel.world === 14 &&
      currentLevel.id === 1

    const swampFlowSpeed = isSwampSurprise
      ? elapsedTime < 0.85
        ? 12
        : 95
      : normalFlowSpeed

    const effectiveSpeed =
      swampFlowSpeed *
      liveObstacleEffect.flowMultiplier *
      survivorInterference.flowMultiplier

    const amountToAdd =
      effectiveSpeed / 100

    if (!hasWaterReserve) {
      const nextWater =
        currentWater +
        amountToAdd

        // SPLASH — Physical overflow
        // Trigger only when crossing 100%.
        if (
          currentWater <= 100 &&
          nextWater > 100
        ) {
          playOverflowSound()
        }

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

        // SPLASH — Physical overflow with water reserve
        if (
          currentWater <= 100 &&
          nextWater > 100
        ) {
          playOverflowSound()
        }

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
              startEvaporationOrFinishFromEffect(
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
    currentLevel.world,
    currentLevel.id,
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

  // GLOBAL GAME CLOCK

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

  // WORLD 3 — TIME LIMIT
  // Schedule the failure as a timer callback rather than updating state
  // synchronously inside an effect.
  useEffect(() => {
    if (
      !hasTimeLimit ||
      timeLeft === null ||
      !timerStarted ||
      result !== 'waiting' ||
      levelSucceeded ||
      levelFailed
    ) {
      return
    }

    const timeout = window.setTimeout(() => {
      setTimerStarted(false)
      setIsFilling(false)
      setIsInertiaActive(false)
      inertiaTimeRef.current = 0
      setIsEvaporating(false)
      setEvaporationTimeLeft(0)
      setResult('TOO LOW')
      registerFailureFromEffect()
    }, Math.max(timeLeft * 1000, 0))

    return () => window.clearTimeout(timeout)
  }, [
    hasTimeLimit,
    timeLeft,
    timerStarted,
    result,
    levelSucceeded,
    levelFailed,
  ])

  // WORLD 4 — INERTIA

useEffect(() => {
  if (
    !isInertiaActive ||
    inertiaTimeRef.current <= 0 ||
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

    const effectiveSpeed = getEffectiveFlowSpeed({
      baseSpeed: currentLevel.fillSpeed,
      flowType: currentLevel.flowType,
      waterLevel: currentWater,
      elapsedTime,
      hasObstacles,
      obstacleMode,
      obstacleStrength,
      obstaclePositions,
      obstacleMovementSpeed,
    })

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

        const nextInertiaTime = Math.max(
  inertiaTimeRef.current - 0.01,
  0,
)
        inertiaTimeRef.current = nextInertiaTime

        if (nextInertiaTime <= 0) {
          window.clearInterval(interval)
          setIsInertiaActive(false)
          startEvaporationOrFinishFromEffect(waterLevelRef.current)
        }
      }, 10)

    return () => {
      window.clearInterval(
        interval,
      )
    }
  }, [
    isInertiaActive,
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

  // WORLD 5 — EVAPORATION

  useEffect(() => {
    if (
      !isEvaporating ||
      evaporationTimeRef.current <= 0 ||
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

        if (nextTime <= 0) {
          window.clearInterval(interval)
          setIsEvaporating(false)
          finishAttemptFromEffect(waterLevelRef.current)
        }
      }, 10)

    return () => {
      window.clearInterval(
        interval,
      )
    }
  }, [
    isEvaporating,
    evaporationBaseRate,
    initialTemperature,
    result,
    levelSucceeded,
    levelFailed,
  ])

  // CLICK — TOGGLE FILLING ON / OFF

  const toggleFilling = () => {
    if (isFilling) {
      setIsFilling(false)
      setTimerStarted(false)

      if (
        hasInertia &&
        currentLevel.inertia > 0
      ) {
        inertiaTimeRef.current = currentLevel.inertia
        setIsInertiaActive(true)

        return
      }

      startEvaporationOrFinish(
        waterLevelRef.current,
      )
      return
    }

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

  // RESET CURRENT ATTEMPT

  const resetAttemptState = () => {
  setWaterLevel(0)
  waterLevelRef.current = 0

  setIsFilling(false)

  setResult('waiting')

    setElapsedTime(0)
    setTimerStarted(false)

    setIsInertiaActive(false)
    inertiaTimeRef.current = 0

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

  // RETRY LEVEL

  const retryLevel = () => {
    if (attemptsLeft <= 0) {
      return
    }

    resetAttemptState()
  }

  // LOAD LEVEL

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
    inertiaTimeRef.current = 0

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

  // RESTART LEVEL

  const restartLevel = () => {
    loadLevel(currentLevelIndex)
  }

  // NEXT LEVEL / WORLD

  const goToNextLevel = () => {
    if (
      currentLevelIndex >=
      levels.length - 1
    ) {
      stopBackgroundMusic()
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

  // DISPLAY VALUES

  const displayedLevel =
    Math.round(waterLevel)

  // Physical overflow starts above the glass capacity.
const isPhysicallyOverflowing = waterLevel > 100
// FLOOD MODE — purely visual.
// The page starts flooding after 150%
// and is fully flooded at 400%.
const floodProgress = Math.min(
  Math.max((waterLevel - 110) / 90, 0),
  1,
)

const floodHeight = floodProgress * 100

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

  // VISUAL WATER LEVEL

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

  // FINAL GLASS TRANSFORM

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

// WELCOME SCREEN

useEffect(() => {
  if (showWelcome || showWorldSelection || showEnding) {
    playWelcomeMusic()
  }
}, [showWelcome, showWorldSelection, showEnding])

if (showWelcome) {
  return (
    <CapybaraWelcome
      onStart={() => {
        setShowWelcome(false)
        setShowWorldSelection(true)
      }}
    />
  )
}

// WORLD SELECTION SCREEN

if (showWorldSelection) {
  return (
    <WorldMapScreen
      progress={playerProgress}
      selectedWorld={selectedWorld}
      onSelectWorld={setSelectedWorld}
      onBackToWelcome={() => {
        setSelectedWorld(null)
        setShowWorldSelection(false)
        setShowWelcome(true)
      }}
      onSelectLevel={(targetIndex) => {
        setGameComplete(false)
        loadLevel(targetIndex)
        setShowWorldSelection(false)
        playBackgroundMusic()
      }}
    />
  )
}

  // GAME COMPLETE SCREEN
  
  if (showEnding) {
  return (
    <CapybaraEnding
      onPlayAgain={() => {
        setShowEnding(false)
        setGameComplete(false)
        setShowWorldSelection(false)
        setShowWelcome(true)
        loadLevel(0)
      }}
    />
  )
}

if (gameComplete) {
  return (
    <CapybaraCelebration
      onFinished={() => setShowEnding(true)}
    />
  )
}

  // RESULT SCREENS — extracted into a reusable component

  if (worldComplete || levelSucceeded || levelFailed) {
    return (
      <GameOutcomeScreen
        kind={worldComplete ? 'world' : levelSucceeded ? 'success' : 'failure'}
        world={currentLevel.world}
        level={currentLevel.id}
        result={result}
        isFinalLevel={currentLevelIndex === levels.length - 1}
        onNextWorld={goToNextWorld}
        onNextLevel={goToNextLevel}
        onRestart={restartLevel}
      />
    )
  }

  // MAIN GAME SCREEN

  return (
    <main className="app">
      {/* PLAYER MENU — PASTEL BLUE */}
    <GameMenuButton
      onReturnToWorlds={() => {
        setIsFilling(false)
        setTimerStarted(false)
        setIsInertiaActive(false)
        setIsEvaporating(false)

        setSelectedWorld(null)
        setShowWorldSelection(true)
        setGameComplete(false)

        stopBackgroundMusic()
        playWelcomeMusic()
      }}
    />

      <GameEffectsOverlay
        floodProgress={floodProgress}
        floodHeight={floodHeight}
        showBlackout={hasSurvivors && survivorInterference.isBlackout}
        blackoutOpacity={survivorInterference.blackoutOpacity}
      />

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

        <GameInfoPanel
          currentLevel={currentLevel}
          hasTimeLimit={hasTimeLimit}
          hasWaterReserve={hasWaterReserve}
          hasInertia={hasInertia}
          hasEnvironment={hasEnvironment}
          hasObstacles={hasObstacles}
          hasMotion={hasMotion}
          hasFrogs={hasFrogs}
          hasWarriors={hasWarriors}
          hasSurvivors={hasSurvivors}
          hasMud={hasMud}
          attemptsLeft={attemptsLeft}
          timerStarted={timerStarted}
          timeLeft={timeLeft}
          displayedTime={displayedTime}
          waterReserve={waterReserve}
          maximumWaterReserve={maximumWaterReserve}
          displayedReserve={displayedReserve}
          reservePercentage={reservePercentage}
          displayedTemperature={displayedTemperature}
          temperaturePercentage={temperaturePercentage}
          currentEvaporationRate={currentEvaporationRate}
          obstacleEffect={obstacleEffect}
          isFilling={isFilling}
          frogInterference={frogInterference}
          isInertiaActive={isInertiaActive}
          isEvaporating={isEvaporating}
        />

        {/* ===============================================
            GLASS / CONTAINER
            =============================================== */}

        <GlassStage
          containerShape={currentLevel.containerShape}
          isPhysicallyOverflowing={isPhysicallyOverflowing}
          hasGlassMovement={hasGlassMovement}
          finalGlassX={finalGlassX}
          finalGlassY={finalGlassY}
          finalGlassRotation={finalGlassRotation}
          isGlassHidden={warriorInterference.isGlassHidden}
          visualWaterLevel={visualWaterLevel}
          showTargetZone={currentLevel.showTargetZone}
          visualTargetMinimum={visualTargetMinimum}
          visualTargetHeight={visualTargetHeight}
          showPercentage={currentLevel.showPercentage}
          displayedLevel={displayedLevel}
          flowSpeed={currentFlowSpeed * survivorInterference.flowMultiplier}
          obstacles={hasObstacles ? (
            <ObstacleField
              positions={obstacleEffect.activePositions}
              isBlockingFlow={obstacleEffect.isBlockingFlow}
              moving={obstacleMode === 'moving'}
              blindSpotSize={blindSpotSize}
            />
          ) : null}
          frogs={hasFrogs ? (
            <FrogField
              frogCount={frogInterference.frogsInGlass}
              obstruction={frogInterference.visualObstruction}
              isMartini={currentLevel.containerShape === 'martini'}
              isNarrowConical={currentLevel.world === 14 && currentLevel.id === 2}
            />
          ) : null}
          warriors={hasWarriors ? (
            <WarriorField
              mode={warriorMode}
              triggeredEvents={warriorInterference.triggeredEvents}
              visible={warriorInterference.isWarriorVisible}
              progress={warriorInterference.warriorProgress}
              obstruction={warriorInterference.visualObstruction}
              glassHidden={warriorInterference.isGlassHidden}
            />
          ) : null}
        />

        {/* ===============================================
            PERCENTAGE
            =============================================== */}

          <GameReadout
            showPercentage={currentLevel.showPercentage}
            displayedLevel={displayedLevel}
            result={result}
          />

        {/* ===============================================
            RESULT
            =============================================== */}

        {/* ===============================================
            MAIN ACTION BUTTON
            =============================================== */}

          <FillButton
            isWaiting={result === 'waiting'}
            isFilling={isFilling}
            isInertiaActive={isInertiaActive}
            isEvaporating={isEvaporating}
            onToggleFilling={toggleFilling}
            onRetry={retryLevel}
          />

        {/* ===============================================
            PLAYER HINT
            =============================================== */}

        <PlayerHint
          isInertiaActive={isInertiaActive}
          isEvaporating={isEvaporating}
          result={result}
          hasFrogs={hasFrogs}
          frogMode={frogMode}
          frogsInGlass={frogInterference.frogsInGlass}
          frogTriggeredEvents={frogInterference.triggeredEvents}
          frogIsActive={frogInterference.isActive}
          hasObstacles={hasObstacles}
          obstacleIsBlockingFlow={obstacleEffect.isBlockingFlow}
          blindSpotSize={blindSpotSize}
          obstacleMode={obstacleMode}
          hasEnvironment={hasEnvironment}
          hasTimeLimit={hasTimeLimit}
          timerStarted={timerStarted}
          hasWaterReserve={hasWaterReserve}
          hasInertia={hasInertia}
          hasMotion={hasMotion}
        />
      </section>
    </main>
  )
}

export default App
