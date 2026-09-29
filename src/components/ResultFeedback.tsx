import type { GameResult } from '../game/types'

import capybaraSuccess from '../assets/capybara-success.png'
import capybaraFailure from '../assets/capybara-failure.png'

interface ResultFeedbackProps {
  result: GameResult
  levelFailed: boolean
}

function ResultFeedback({
  result,
  levelFailed,
}: ResultFeedbackProps) {
  // =====================================================
  // SUCCESS — après CHAQUE niveau réussi
  // =====================================================

  if (result === 'SUCCESS' || result === 'PERFECT') {
  return (
    <div className="result-feedback success-feedback">

      <div className="confetti" aria-hidden="true">
        <span>🎉</span>
        <span>✨</span>
        <span>🎊</span>
        <span>✨</span>
        <span>🎉</span>
      </div>

      <img
        className="capybara-image success-capybara"
        src={capybaraSuccess}
        alt="Happy capybara celebrating"
      />

      <p className="feedback-title">
        {result === 'PERFECT' ? 'PERFECT!' : 'LEVEL COMPLETE!'}
      </p>

      <p className="feedback-message">
        {result === 'PERFECT'
          ? 'Bullseye! Exact target!'
          : 'Target reached!'}
      </p>

    </div>
  )
}

  // =====================================================
  // FAILURE — UNIQUEMENT quand les 3 attempts sont perdues
  // =====================================================

  if (levelFailed) {
    return (
      <div className="result-feedback failure-feedback">

        <div
          className="failure-zero"
          aria-hidden="true"
        >
          0
        </div>

        <img
          className="capybara-image failure-capybara"
          src={capybaraFailure}
          alt="Sad capybara crying"
        />

        <p className="feedback-title">
          NO ATTEMPTS LEFT
        </p>

        <p className="feedback-message">
          Restart this level and try again.
        </p>

      </div>
    )
  }

  // Pas de capybara pour un simple TOO LOW / OVERFLOW.
  return null
}

export default ResultFeedback