import type { GameResult } from '../game/types'

type Props = {
  showPercentage: boolean
  displayedLevel: number
  result: GameResult
}

/** Read-only water percentage and outcome text. */
export default function GameReadout({ showPercentage, displayedLevel, result }: Props) {
  return (
    <div className="game-readout-slot">
      {showPercentage && <p className="percentage">{displayedLevel}%</p>}
      {result !== 'waiting' && <p className="result">{result}</p>}
    </div>
  )
}
