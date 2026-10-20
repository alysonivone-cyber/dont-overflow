import type { GameResult } from '../game/types'
import ResultFeedback from './ResultFeedback'

type Props = {
  kind: 'world' | 'success' | 'failure'
  world: number
  level: number
  result: GameResult
  isFinalLevel: boolean
  onNextWorld: () => void
  onNextLevel: () => void
  onRestart: () => void
}

export default function GameOutcomeScreen({
  kind,
  world,
  level,
  result,
  isFinalLevel,
  onNextWorld,
  onNextLevel,
  onRestart,
}: Props) {
  const isWorldComplete = kind === 'world'
  const isFailure = kind === 'failure'

  const title = isWorldComplete
    ? 'WORLD COMPLETE!'
    : isFailure
      ? 'GAME OVER'
      : result === 'PERFECT'
        ? 'PERFECT!'
        : 'LEVEL COMPLETE!'

  const subtitle = isWorldComplete
    ? 'You survived every level in this world.'
    : isFailure
      ? 'No attempts remaining.'
      : 'You hit the target.'

  const buttonLabel = isWorldComplete
    ? 'NEXT WORLD'
    : isFailure
      ? 'TRY AGAIN'
      : isFinalLevel
        ? '🏆 FINAL CELEBRATION!'
        : 'NEXT LEVEL'

  const handleContinue = isWorldComplete
    ? onNextWorld
    : isFailure
      ? onRestart
      : onNextLevel

  return (
    <main className="app">
      <section className="game-card">
        <p className="eyebrow">
          WORLD {world}{!isWorldComplete && <> • LEVEL {level}</>}
        </p>
        <h1 className="game-title">{title}</h1>
        <p className="game-subtitle">{subtitle}</p>
        <ResultFeedback
          result={isWorldComplete ? 'PERFECT' : result}
          levelFailed={isFailure}
        />
        <button className="fill-button" type="button" onClick={handleContinue}>
          {buttonLabel}
        </button>
      </section>
    </main>
  )
}
