import { useEffect, useState } from 'react'
import './App.css'

import { levels } from './game/levels'
import { evaluateResult } from './game/evaluateResult'
import type { GameResult } from './game/types'
import ResultFeedback from './components/ResultFeedback'

function App() {
  // =====================================================
  // LEVEL STATE
  // =====================================================

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0)

  const currentLevel = levels[currentLevelIndex]

  // =====================================================
  // GAME STATE
  // =====================================================

  const [waterLevel, setWaterLevel] = useState(0)
  const [isFilling, setIsFilling] = useState(false)
  const [result, setResult] = useState<GameResult>('waiting')

  const [attemptsLeft, setAttemptsLeft] = useState(
    levels[0].attempts,
  )

  const [worldComplete, setWorldComplete] = useState(false)

  // =====================================================
  // DERIVED GAME STATE
  // =====================================================

  // SUCCESS = dans la target
  // PERFECT = exactement sur la target centrale
  // Les DEUX permettent de réussir le niveau.
  const levelSucceeded =
    result === 'SUCCESS' || result === 'PERFECT'

  // Le niveau est définitivement raté uniquement
  // lorsque les 3 attempts ont été utilisées.
  const levelFailed =
    attemptsLeft === 0 && !levelSucceeded

  // =====================================================
  // WATER FILLING
  // =====================================================

  useEffect(() => {
    if (
      !isFilling ||
      worldComplete ||
      levelSucceeded ||
      levelFailed
    ) {
      return
    }

    const interval = window.setInterval(() => {
      setWaterLevel((currentWaterLevel) => {
        return currentWaterLevel + currentLevel.fillSpeed / 100
      })
    }, 10)

    return () => window.clearInterval(interval)
  }, [
    isFilling,
    currentLevel.fillSpeed,
    worldComplete,
    levelSucceeded,
    levelFailed,
  ])

  // =====================================================
  // PLAYER INPUT
  // =====================================================

  const pointerDown = () => {
    if (
      result !== 'waiting' ||
      worldComplete ||
      attemptsLeft <= 0
    ) {
      return
    }

    setIsFilling(true)
  }

  const pointerUp = () => {
    if (
      !isFilling ||
      result !== 'waiting' ||
      worldComplete
    ) {
      return
    }

    setIsFilling(false)

    const evaluatedResult = evaluateResult(
      waterLevel,
      currentLevel,
    )

    setResult(evaluatedResult)

    // Une tentative est consommée uniquement
    // lorsque le joueur rate.
    if (
      evaluatedResult !== 'SUCCESS' &&
      evaluatedResult !== 'PERFECT'
    ) {
      setAttemptsLeft((currentAttempts) =>
        Math.max(currentAttempts - 1, 0),
      )
    }
  }

  // =====================================================
  // TRY AGAIN
  // =====================================================

  // Il reste encore des attempts :
  // on recommence simplement une tentative.
  const retryLevel = () => {
    if (attemptsLeft <= 0) return

    setIsFilling(false)
    setWaterLevel(0)
    setResult('waiting')
  }

  // =====================================================
  // RESTART FAILED LEVEL
  // =====================================================

  // Les 3 attempts ont été utilisées :
  // on reste sur EXACTEMENT le même niveau
  // mais on récupère toutes les attempts.
  const restartLevel = () => {
    setIsFilling(false)
    setWaterLevel(0)
    setResult('waiting')
    setAttemptsLeft(currentLevel.attempts)
  }

  // =====================================================
  // NEXT LEVEL
  // =====================================================

  const nextLevel = () => {
    const nextLevelIndex = currentLevelIndex + 1

    // Le niveau réussi était le dernier du World 1.
    if (nextLevelIndex >= levels.length) {
      setIsFilling(false)
      setWorldComplete(true)
      return
    }

    const nextLevelConfig = levels[nextLevelIndex]

    setCurrentLevelIndex(nextLevelIndex)

    setIsFilling(false)
    setWaterLevel(0)
    setResult('waiting')

    // Le nouveau niveau recommence avec
    // toutes ses attempts.
    setAttemptsLeft(nextLevelConfig.attempts)
  }

  // =====================================================
  // RESTART WORLD
  // =====================================================

  const restartWorld = () => {
    setCurrentLevelIndex(0)

    setIsFilling(false)
    setWaterLevel(0)
    setResult('waiting')

    setAttemptsLeft(levels[0].attempts)

    setWorldComplete(false)
  }

  // =====================================================
  // DISPLAY VALUES
  // =====================================================

  const displayedLevel = Math.round(waterLevel)

  const targetMinimum =
    currentLevel.target - currentLevel.tolerance

  const targetHeight =
    currentLevel.tolerance * 2

  // =====================================================
  // WORLD COMPLETE SCREEN
  // =====================================================

  if (worldComplete) {
    return (
      <main className="game">
        <section className="game-card world-complete">

          <p className="eyebrow">
            WORLD 1 COMPLETE
          </p>

          <h1 className="game-title">
            CALIBRATION MASTERED!
          </h1>

          <p className="game-subtitle">
            You mastered the basic filling controls.
          </p>

          <p className="level-instruction">
            The next world will challenge how you perceive
            the container.
          </p>

          <button
            className="fill-button"
            type="button"
            onClick={restartWorld}
          >
            REPLAY WORLD 1
          </button>

        </section>
      </main>
    )
  }

  // =====================================================
  // SUCCESS SCREEN
  // =====================================================
  //
  // IMPORTANT :
  // cet écran apparaît après CHAQUE niveau réussi.
  //
  // Level 1 → success screen
  // Level 2 → success screen
  // Level 3 → success screen
  // Level 4 → success screen
  // Level 5 → success screen
  //
  // =====================================================

  if (levelSucceeded) {
    return (
      <main className="game">
        <section className="game-card result-screen">

          <p className="eyebrow">
            WORLD {currentLevel.world} • LEVEL {currentLevel.id}
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

          <button
            className="fill-button"
            type="button"
            onClick={nextLevel}
          >
            {currentLevelIndex === levels.length - 1
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
  //
  // Cet écran apparaît à 0/3 sur N'IMPORTE QUEL niveau.
  // RESTART LEVEL reste sur le niveau actuel.
  //
  // =====================================================

  if (levelFailed) {
    return (
      <main className="game">
        <section className="game-card result-screen">

          <p className="eyebrow">
            WORLD {currentLevel.world} • LEVEL {currentLevel.id}
          </p>

          <h1 className="game-title">
            DON'T OVERFLOW!
          </h1>

          <ResultFeedback
            result={result}
            levelFailed={true}
          />

          <div className="attempts-counter">
            ATTEMPTS 0/{currentLevel.attempts}
          </div>

          <button
            className="fill-button"
            type="button"
            onClick={restartLevel}
          >
            RESTART LEVEL
          </button>

          <p className="hint">
            Restart this level with {currentLevel.attempts} new attempts.
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
          WORLD {currentLevel.world} • LEVEL {currentLevel.id}
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
            ATTEMPTS {attemptsLeft}/{currentLevel.attempts}
          </div>

        </div>

        <div className="container">
          <div className="glass">

            <div
              className="water"
              style={{
                height: `${Math.min(waterLevel, 100)}%`,
              }}
            />

            {currentLevel.showTargetZone && (
              <div
                className="target-zone"
                style={{
                  bottom: `${targetMinimum}%`,
                  height: `${targetHeight}%`,
                }}
              >
                <span>TARGET</span>
              </div>
            )}

          </div>
        </div>

        {currentLevel.showPercentage && (
          <p className="percentage">
            {displayedLevel}%
          </p>
        )}

        {/* Un simple échec ne déclenche PAS
            le capybara triste. */}

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
            onPointerDown={pointerDown}
            onPointerUp={pointerUp}
            onPointerLeave={pointerUp}
            onPointerCancel={pointerUp}
          >
            HOLD TO FILL
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

        <p className="hint">
          {result === 'waiting'
            ? 'Hold to fill • Release to stop'
            : 'Try again before you run out of attempts.'}
        </p>

        {/* =================================================
            DEVELOPMENT DEBUG
            ================================================= */}

        <div className="debug-state">

          <span>
            level: {currentLevel.id}
          </span>

          <span>
            waterLevel: {displayedLevel}
          </span>

          <span>
            target: {currentLevel.target}%
          </span>

          <span>
            tolerance: ±{currentLevel.tolerance}%
          </span>

          <span>
            attempts: {attemptsLeft}/{currentLevel.attempts}
          </span>

          <span>
            fillSpeed: {currentLevel.fillSpeed}
          </span>

          <span>
            isFilling: {String(isFilling)}
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