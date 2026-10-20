
import { useEffect, useState } from 'react'
import capybaraChampion from '../assets/capybaras/capybara-champion.png'
import './CapybaraEnding.css'

type Props = {
  onPlayAgain: () => void
}

type EndingStep = 'story' | 'video' | 'final'

export default function CapybaraEnding({
  onPlayAgain,
}: Props) {
  const [step, setStep] = useState<EndingStep>('story')
  const [videoError, setVideoError] = useState(false)

  // Automatically start final video
  useEffect(() => {
    if (step !== 'story') return

    const timer = window.setTimeout(() => {
      setStep('video')
    }, 9000)

    return () => window.clearTimeout(timer)
  }, [step])

  if (step === 'story') {
    return (
      <main className="capy-story-screen">
        <section className="capy-story-card">
          <p className="capy-story-chapter">
            CHAPTER III — THE JOURNEY HOME
          </p>

          <div className="capy-story-decoration">
            🏆 🎟️ 💗
          </div>

          <h1>The Greatest Prize of All</h1>

          <p>
            Against all odds, Cappy has conquered
            all 15 worlds and completed all 75 levels!
          </p>

          <p>
            With his Golden Ticket finally in his paws,
            he can return to CapybaraLand just in time
            for New Year's Eve.
          </p>

          <p className="capy-story-highlight">
            His greatest reward isn't the trophy...
            it's being home with the ones he loves.
          </p>

          <button
            type="button"
            className="capy-story-continue"
            onClick={() => setStep('video')}
          >
            CONTINUE ▶
          </button>

          <p className="capy-story-timer">
            The story continues automatically...
          </p>
        </section>
      </main>
    )
  }

  if (step === 'video') {
    return (
      <main className="capy-cinematic">
        <video
          className="capy-cinematic-video"
          src="/videos/cappy-homecoming.mp4"
          autoPlay
          playsInline
          preload="auto"
          onEnded={() => setStep('final')}
          onError={() => setVideoError(true)}
        />

        {videoError && (
          <p className="capy-cinematic-error">
            Unable to load the final video.
          </p>
        )}

        <button
          type="button"
          className="capy-cinematic-skip"
          onClick={() => setStep('final')}
        >
          SKIP VIDEO →
        </button>
      </main>
    )
  }

  return (
    <main className="capy-ending capy-ending-final">
      <div className="capy-ending-content">
        <img
          className="capy-ending-character"
          src={capybaraChampion}
          alt="Cappy heureux après son aventure"
        />

        <h1>YOU DIDN'T OVERFLOW.</h1>

        <h2>YOU MADE IT HOME. 💗</h2>

        <p>
          Thank you for playing DON'T OVERFLOW!
        </p>

        <button
          type="button"
          className="capy-ending-replay"
          onClick={onPlayAgain}
        >
          PLAY AGAIN ↻
        </button>
      </div>
    </main>
  )
}
