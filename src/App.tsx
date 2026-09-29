import { useEffect, useRef, useState } from 'react'

import './App.css'

import { levels } from './game/levels'
import { evaluateResult } from './game/evaluateResult'
import { getVisualWaterLevel } from './game/getVisualWaterLevel'
import { getFlowSpeed } from './game/getFlowSpeed'

import type { GameResult } from './game/types'

import ResultFeedback from './components/ResultFeedback'

import {
  playSuccessSound,
  playErrorSound,
  playGameOverSound,
} from './game/soundManager'

function App() {
  // =====================================================
  // LEVEL STATE
  // =====================================================

  const [currentLevelIndex, setCurrentLevelIndex] =
    useState(0)

  const currentLevel = levels[currentLevelIndex]

  // =====================================================
  // GAME STATE
  // =====================================================

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
  // WORLD 3 — PRESSURE STATE
  // =====================================================

  const [elapsedTime, setElapsedTime] =
    useState(0)

  const [timerStarted, setTimerStarted] =
    useState(false)

  // =====================================================
  // WORLD 4 — CONTROL STATE
  // =====================================================

  /*
   * Remaining water belongs to the LEVEL.
   *
   * TRY AGAIN:
   * keeps the remaining reserve.
   *
   * RESTART LEVEL:
   * restores the full reserve.
   */
  const [waterReserve, setWaterReserve] =
    useState<number | null>(
      levels[0].waterReserve,
    )

  /*
   * After the player releases the button,
   * inertia can keep water flowing.
   */
  const [isInertiaActive, setIsInertiaActive] =
    useState(false)

  /*
   * Remaining inertia duration in seconds.
   */
  const [inertiaTimeLeft, setInertiaTimeLeft] =
    useState(0)

  /*
   * We keep the water value in a ref too.
   *
   * This lets delayed callbacks evaluate the
   * most recent water level instead of an old
   * React render value.
   */
  const waterLevelRef = useRef(0)

  /*
   * Same idea for the reserve.
   */
  const waterReserveRef =
    useRef<number | null>(
      levels[0].waterReserve,
    )

  // =====================================================
  // KEEP REFS SYNCHRONIZED
  // =====================================================

  useEffect(() => {
    waterLevelRef.current = waterLevel
  }, [waterLevel])

  useEffect(() => {
    waterReserveRef.current = waterReserve
  }, [waterReserve])

  // =====================================================
  // DERIVED GAME STATE
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
  // WORLD 3 — TIMER VALUES
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
  // WORLD 4 — RESOURCE VALUES
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
  // CURRENT FLOW SPEED
  // =====================================================

  const currentFlowSpeed =
    getFlowSpeed({
      baseSpeed: currentLevel.fillSpeed,
      flowType: currentLevel.flowType,
      waterLevel,
      elapsedTime,
    })

  // =====================================================
  // FAILURE HANDLER
  // =====================================================

  const registerFailure = () => {
    setIsFilling(false)
    setIsInertiaActive(false)
    setInertiaTimeLeft(0)

    const nextAttempts = Math.max(
      attemptsLeft - 1,
      0,
    )

    setAttemptsLeft(nextAttempts)

    if (nextAttempts === 0) {
      playGameOverSound()
    } else {
      playErrorSound()
    }
  }

  // =====================================================
  // EVALUATE FINAL WATER LEVEL
  // =====================================================

  const finishAttempt = (
    finalWaterLevel: number,
  ) => {
    setIsFilling(false)
    setIsInertiaActive(false)
    setInertiaTimeLeft(0)

    const evaluatedResult =
      evaluateResult(
        finalWaterLevel,
        currentLevel,
      )

    setResult(evaluatedResult)

    if (
      evaluatedResult === 'SUCCESS' ||
      evaluatedResult === 'PERFECT'
    ) {
      playSuccessSound()
      return
    }

    registerFailure()
  }

  // =====================================================
  // WATER FILLING
  // =====================================================

  useEffect(() => {
    if (
      !isFilling ||
      isInertiaActive ||
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

        const effectiveSpeed =
          getFlowSpeed({
            baseSpeed:
              currentLevel.fillSpeed,

            flowType:
              currentLevel.flowType,

            waterLevel:
              currentWater,

            elapsedTime,
          })

        /*
         * Interval = 10 ms.
         *
         * fillSpeed represents percentage
         * points per second.
         */
        const amountToAdd =
          effectiveSpeed / 100

        // -----------------------------------------------
        // LEVELS WITHOUT WATER RESERVE
        // -----------------------------------------------

        if (!hasWaterReserve) {
          const nextWater =
            currentWater + amountToAdd

          waterLevelRef.current =
            nextWater

          setWaterLevel(nextWater)

          return
        }

        // -----------------------------------------------
        // LEVELS WITH WATER RESERVE
        // -----------------------------------------------

        const currentReserve =
          waterReserveRef.current ?? 0

        /*
         * We cannot pour more water than
         * what remains in the reserve.
         */
        const actualAmount =
          Math.min(
            amountToAdd,
            currentReserve,
          )

        const nextWater =
          currentWater + actualAmount

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

        setWaterLevel(nextWater)
        setWaterReserve(nextReserve)

        /*
         * Reserve empty:
         * stop pouring and evaluate exactly
         * where the player ended.
         */
        if (nextReserve <= 0) {
          setIsFilling(false)

          window.setTimeout(() => {
            finishAttempt(nextWater)
          }, 0)
        }
      }, 10)

    return () => {
      window.clearInterval(interval)
    }
  }, [
    isFilling,
    isInertiaActive,
    currentLevel.fillSpeed,
    currentLevel.flowType,
    elapsedTime,
    hasWaterReserve,
    worldComplete,
    gameComplete,
    levelSucceeded,
    levelFailed,
    result,
  ])

  // =====================================================
  // WORLD 3 — TIMER
  // =====================================================

  useEffect(() => {
    if (
      !timerStarted ||
      !hasTimeLimit ||
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
    hasTimeLimit,
    result,
    worldComplete,
    gameComplete,
    levelSucceeded,
    levelFailed,
  ])

  // =====================================================
  // WORLD 3 — TIMER EXPIRATION
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

    setIsFilling(false)
    setIsInertiaActive(false)
    setInertiaTimeLeft(0)

    setResult('OVERFLOW')

    const nextAttempts = Math.max(
      attemptsLeft - 1,
      0,
    )

    setAttemptsLeft(nextAttempts)

    if (nextAttempts === 0) {
      playGameOverSound()
    } else {
      playErrorSound()
    }
  }, [
    hasTimeLimit,
    timerStarted,
    timeLeft,
    result,
    attemptsLeft,
  ])

  // =====================================================
  // WORLD 4 — INERTIA
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

        /*
         * inertiaProgress:
         *
         * 1 = inertia just started
         * 0 = inertia finished
         */
        const inertiaProgress =
          currentLevel.inertia > 0
            ? Math.max(
                inertiaTimeLeft /
                  currentLevel.inertia,
                0,
              )
            : 0

        /*
         * Water starts with a fraction of
         * the normal flow and progressively
         * slows down.
         */
        const inertiaSpeed =
          currentLevel.fillSpeed *
          0.55 *
          inertiaProgress

        const amountToAdd =
          inertiaSpeed / 100

        // -----------------------------------------------
        // INERTIA WITHOUT RESERVE
        // -----------------------------------------------

        if (!hasWaterReserve) {
          const nextWater =
            currentWater + amountToAdd

          waterLevelRef.current =
            nextWater

          setWaterLevel(nextWater)

          return
        }

        // -----------------------------------------------
        // INERTIA WITH RESERVE
        // -----------------------------------------------

        const currentReserve =
          waterReserveRef.current ?? 0

        const actualAmount =
          Math.min(
            amountToAdd,
            currentReserve,
          )

        const nextWater =
          currentWater + actualAmount

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

        setWaterLevel(nextWater)
        setWaterReserve(nextReserve)

        /*
         * If inertia consumes the final drop,
         * the attempt ends immediately.
         */
        if (nextReserve <= 0) {
          setIsInertiaActive(false)
          setInertiaTimeLeft(0)

          window.setTimeout(() => {
            finishAttempt(nextWater)
          }, 0)
        }
      }, 10)

    return () => {
      window.clearInterval(interval)
    }
  }, [
    isInertiaActive,
    inertiaTimeLeft,
    currentLevel.inertia,
    currentLevel.fillSpeed,
    hasWaterReserve,
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
      window.clearInterval(timer)
    }
  }, [
    isInertiaActive,
    result,
  ])

  // =====================================================
  // WORLD 4 — FINISH AFTER INERTIA
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

    finishAttempt(
      waterLevelRef.current,
    )
  }, [
    isInertiaActive,
    inertiaTimeLeft,
    result,
  ])

  // =====================================================
  // PLAYER INPUT — POINTER DOWN
  // =====================================================

  const pointerDown = () => {
    if (
      result !== 'waiting' ||
      worldComplete ||
      gameComplete ||
      attemptsLeft <= 0 ||
      isInertiaActive
    ) {
      return
    }

    /*
     * No water left:
     * the player cannot start another pour.
     */
    if (
      hasWaterReserve &&
      (waterReserveRef.current ?? 0) <= 0
    ) {
      finishAttempt(
        waterLevelRef.current,
      )

      return
    }

    // World 3 timer begins on first interaction.
    if (
      hasTimeLimit &&
      !timerStarted
    ) {
      setTimerStarted(true)
    }

    setIsFilling(true)
  }

  // =====================================================
  // PLAYER INPUT — POINTER UP
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

    // -----------------------------------------------
    // WORLD 4 — INERTIA
    // -----------------------------------------------

    if (hasInertia) {
      setInertiaTimeLeft(
        currentLevel.inertia,
      )

      setIsInertiaActive(true)

      return
    }

    // -----------------------------------------------
    // NORMAL IMMEDIATE STOP
    // -----------------------------------------------

    finishAttempt(
      waterLevelRef.current,
    )
  }

  // =====================================================
  // RESET CURRENT ATTEMPT
  // =====================================================

  /*
   * IMPORTANT:
   *
   * This does NOT restore waterReserve.
   *
   * Therefore TRY AGAIN keeps the remaining
   * resource from the previous attempt.
   */
  const resetAttemptState = () => {
    setIsFilling(false)

    setWaterLevel(0)
    waterLevelRef.current = 0

    setResult('waiting')

    setElapsedTime(0)
    setTimerStarted(false)

    setIsInertiaActive(false)
    setInertiaTimeLeft(0)
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
  // RESTART FAILED LEVEL
  // =====================================================

  const restartLevel = () => {
    resetAttemptState()

    setAttemptsLeft(
      currentLevel.attempts,
    )

    /*
     * RESTART LEVEL restores the complete
     * resource pool.
     */
    setWaterReserve(
      currentLevel.waterReserve,
    )

    waterReserveRef.current =
      currentLevel.waterReserve
  }

  // =====================================================
  // LOAD LEVEL
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

    setIsInertiaActive(false)
    setInertiaTimeLeft(0)

    setAttemptsLeft(
      newLevel.attempts,
    )

    setWaterReserve(
      newLevel.waterReserve,
    )

    waterReserveRef.current =
      newLevel.waterReserve
  }

  // =====================================================
  // NEXT LEVEL
  // =====================================================

  const nextLevel = () => {
    const newLevelIndex =
      currentLevelIndex + 1

    const newLevel =
      levels[newLevelIndex]

    // ---------------------------------------------------
    // END OF ENTIRE GAME
    // ---------------------------------------------------

    if (!newLevel) {
      setIsFilling(false)
      setIsInertiaActive(false)
      setGameComplete(true)

      return
    }

    // ---------------------------------------------------
    // END OF CURRENT WORLD
    // ---------------------------------------------------

    if (
      newLevel.world !==
      currentLevel.world
    ) {
      setIsFilling(false)
      setIsInertiaActive(false)
      setWorldComplete(true)

      return
    }

    // ---------------------------------------------------
    // NEXT LEVEL IN SAME WORLD
    // ---------------------------------------------------

    loadLevel(newLevelIndex)
  }

  // =====================================================
  // START NEXT WORLD
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

    loadLevel(newLevelIndex)

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
  // DISPLAYED REAL WATER VALUE
  // =====================================================

  const displayedLevel =
    Math.round(waterLevel)

  // =====================================================
  // VISUAL PERCEPTION
  // =====================================================

  const visualWaterLevel =
    getVisualWaterLevel(
      waterLevel,
      currentLevel.containerShape,
    )

  // =====================================================
  // VISUAL TARGET ZONE
  // =====================================================

  const realTargetMinimum =
    currentLevel.target -
    currentLevel.tolerance

  const realTargetMaximum =
    currentLevel.target +
    currentLevel.tolerance

  /*
   * Target and water use the SAME visual
   * transformation.
   */
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

  // =====================================================
  // TIMER DISPLAY
  // =====================================================

  const displayedTime =
    timeLeft === null
      ? null
      : timeLeft.toFixed(1)

  // =====================================================
  // RESERVE DISPLAY
  // =====================================================

  const displayedReserve =
    waterReserve === null
      ? null
      : Math.max(
          waterReserve,
          0,
        ).toFixed(0)

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
    return (
      <main className="game">
        <section className="game-card world-complete">
          <p className="eyebrow">
            WORLD {currentLevel.world} COMPLETE
          </p>

          <h1 className="game-title">
            {currentLevel.world === 1
              ? 'CALIBRATION MASTERED!'
              : currentLevel.world === 2
                ? 'PERCEPTION MASTERED!'
                : currentLevel.world === 3
                  ? 'PRESSURE MASTERED!'
                  : currentLevel.world === 4
                    ? 'CONTROL MASTERED!'
                    : 'WORLD MASTERED!'}
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
  // SUCCESS SCREEN
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
                Water remaining: {displayedReserve}%
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
  // FAILED LEVEL SCREEN
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
  // NORMAL GAME SCREEN
  // =====================================================

  return (
    <main className="game">
      <section className="game-card">
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

        {/* =================================================
            LEVEL INFORMATION
            ================================================= */}

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
            WORLD 4 — INERTIA STATUS
            ================================================= */}

        {isInertiaActive && (
          <div className="inertia-status">
            WATER STILL FLOWING...
          </div>
        )}

        {/* =================================================
            CONTAINER
            ================================================= */}

        <div className="container">
          <div
            className={`glass glass-${currentLevel.containerShape}`}
          >
            <div
              className="water"
              style={{
                height: `${Math.min(
                  visualWaterLevel,
                  100,
                )}%`,
              }}
            />

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
            ACTION BUTTON
            ================================================= */}

        {result === 'waiting' ? (
          <button
            className="fill-button"
            type="button"
            disabled={isInertiaActive}
            onPointerDown={pointerDown}
            onPointerUp={pointerUp}
            onPointerLeave={pointerUp}
            onPointerCancel={pointerUp}
          >
            {isInertiaActive
              ? 'WATER STILL FLOWING...'
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
            HINT
            ================================================= */}

        <p className="hint">
          {isInertiaActive
            ? 'You released the button, but momentum is still pushing water.'
            : result === 'waiting'
              ? hasTimeLimit &&
                !timerStarted
                ? 'The timer starts when you begin filling.'
                : hasWaterReserve
                  ? hasInertia
                    ? 'Every drop counts • Release early to anticipate momentum'
                    : 'Every drop counts • Your reserve carries across attempts'
                  : 'Hold to fill • Release to stop'
              : 'Try again before you run out of attempts.'}
        </p>

        {/* =================================================
            DEVELOPMENT DEBUG
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
            {String(isInertiaActive)}
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