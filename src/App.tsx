import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [waterLevel, setWaterLevel] = useState(0)
  const [isFilling, setIsFilling] = useState(false)
  const [result, setResult] = useState('waiting')

  // Vitesse définie dans les specs : 30 % / seconde
  useEffect(() => {
    if (!isFilling) return

    const interval = window.setInterval(() => {
      setWaterLevel((currentLevel) => currentLevel + 0.3)
    }, 10)

    return () => window.clearInterval(interval)
  }, [isFilling])

  // Le joueur commence à remplir
  const pointerDown = () => {
    if (result !== 'waiting') return
    setIsFilling(true)
  }

  // Traduction directe des règles définies dans les specs
  const evaluateResult = (level: number) => {
    if (level > 80) {
      return 'OVERFLOW'
    }

    if (level >= 70) {
      return 'PERFECT'
    }

    return 'TOO LOW'
  }

  // Le joueur relâche : arrêt + évaluation
  const pointerUp = () => {
    if (!isFilling || result !== 'waiting') return

    setIsFilling(false)

    setWaterLevel((currentLevel) => {
      setResult(evaluateResult(currentLevel))
      return currentLevel
    })
  }

  // Réinitialisation volontaire par le joueur
  const resetGame = () => {
    setIsFilling(false)
    setWaterLevel(0)
    setResult('waiting')
  }

  const displayedLevel = Math.round(waterLevel)

  return (
    <main className="game">
      <section className="game-card">

        <p className="eyebrow">PRECISION CHALLENGE</p>

        <h1 className="game-title">DON'T OVERFLOW!</h1>

        <p className="game-subtitle">
          Fill the container. Stop inside the target zone.
        </p>

        <div className="container">
          <div className="glass">

            <div
              className="water"
              style={{
                height: `${Math.min(waterLevel, 100)}%`,
              }}
            />

            <div className="target-zone">
              <span>TARGET</span>
            </div>

          </div>
        </div>

        <p className="percentage">{displayedLevel}%</p>

        {result !== 'waiting' && (
          <p className="result">{result}</p>
        )}

        {result === 'waiting' ? (
          <button
            key="fill"
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
            key="reset"
            className="fill-button"
            type="button"
            onClick={resetGame}
          >
            TRY AGAIN
          </button>
        )}

        <p className="hint">
          {result === 'waiting'
            ? 'Hold to fill • Release to stop'
            : 'Click to start a new attempt'}
        </p>

        <div className="debug-state">
          <span>waterLevel: {displayedLevel}</span>
          <span>isFilling: {String(isFilling)}</span>
          <span>result: {result}</span>
        </div>

      </section>
    </main>
  )
}

export default App