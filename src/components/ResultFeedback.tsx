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
  // SUCCESS
  // =====================================================

  if (
    result === 'SUCCESS' ||
    result === 'PERFECT'
  ) {
    return (
      <div className="result-feedback success-feedback">
        <div
          className="confetti"
          aria-hidden="true"
        >
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
          {result === 'PERFECT'
            ? 'PERFECT!'
            : 'LEVEL COMPLETE!'}
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
  // FAILURE
  // =====================================================

  if (levelFailed) {
    return (
      <div className="result-feedback failure-feedback">
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

  return null
}

export default ResultFeedback