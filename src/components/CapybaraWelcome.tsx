
import { useEffect, useRef, useState } from 'react'
import './CapybaraWelcome.css'
import capybaraWelcome from '../assets/capybaras/capybara-welcome.png'
import { playWelcomeMusic } from '../game/soundManager'

type Props = {
  onStart: () => void
}

type IntroStep =
  | 'welcome'
  | 'story-one'
  | 'video-one'
  | 'story-two'
  | 'video-two'

export default function CapybaraWelcome({ onStart }: Props) {
  const [step, setStep] = useState<IntroStep>('welcome')
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Welcome and story music
  useEffect(() => {
    if (step !== 'welcome') return

    const startMusic = () => playWelcomeMusic()

    startMusic()

    window.addEventListener('pointerdown', startMusic)
    window.addEventListener('keydown', startMusic)

    return () => {
      window.removeEventListener('pointerdown', startMusic)
      window.removeEventListener('keydown', startMusic)
    }
  }, [step])

  // Automatic story transitions
  useEffect(() => {
    if (step !== 'story-one' && step !== 'story-two') {
      return
    }

    const timer = window.setTimeout(() => {
      setStep(
        step === 'story-one'
          ? 'video-one'
          : 'video-two'
      )
    }, 9000)

    return () => window.clearTimeout(timer)
  }, [step])

  // Stop menu music during videos
  const finishIntroduction = () => {
  videoRef.current?.pause()
  playWelcomeMusic()
  onStart()
}

  const beginStory = () => {
    setStep('story-one')
  }

  const advance = () => {
    setVideoError(false)

    switch (step) {
      case 'story-one':
        setStep('video-one')
        break

      case 'video-one':
        videoRef.current?.pause()
        setStep('story-two')
        break

      case 'story-two':
        setStep('video-two')
        break

      case 'video-two':
        finishIntroduction()
        break

      default:
        break
    }
  }

  if (step === 'story-one' || step === 'story-two') {
    const first = step === 'story-one'

    return (
      <main className="capy-story-screen">
        <section
          key={step}
          className="capy-story-card"
        >
          <p className="capy-story-chapter">
            {first
              ? 'CHAPTER I — FAR FROM HOME'
              : 'CHAPTER II — THE GREAT WATER CHALLENGE'}
          </p>

          <div className="capy-story-decoration">
            {first ? '🏡 ❄️ 🦫' : '💧 🏆 🎟️'}
          </div>

          <h1>
            {first
              ? "A Little Capybara's Big Dream"
              : 'One Last Chance to Get Home'}
          </h1>

          {first ? (
            <>
              <p>
                New Year's Eve is approaching,
                and Cappy dreams of returning to
                CapybaraLand to celebrate with his family.
              </p>

              <p>
                But there's one tiny problem...
                his wallet is completely empty.
              </p>
            </>
          ) : (
            <>
              <p>
                Just when Cappy is about to lose hope,
                he discovers the Great Water Challenge!
              </p>

              <p className="capy-story-highlight">
                15 worlds. 75 levels.
                One extraordinary prize:
                a Golden Ticket home.
              </p>

              <p>
                To see his family again,
                Cappy must complete every challenge
                without overflowing the glass!
              </p>
            </>
          )}

          <button
            type="button"
            className="capy-story-continue"
            onClick={advance}
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

  if (step === 'video-one' || step === 'video-two') {
    return (
      <main className="capy-cinematic">
        <video
          key={step}
          ref={videoRef}
          className="capy-cinematic-video"
          src={
            step === 'video-one'
              ? '/videos/cappy-intro.mp4'
              : '/videos/cappy-golden-ticket.mp4'
          }
          autoPlay
          playsInline
          preload="auto"
          onEnded={advance}
          onError={() => setVideoError(true)}
        />

        {videoError && (
          <p className="capy-cinematic-error">
            Unable to load the video.
            You can continue to the next scene.
          </p>
        )}

        <button
          type="button"
          className="capy-cinematic-skip"
          onClick={advance}
        >
          SKIP VIDEO →
        </button>
      </main>
    )
  }

  return (
    <main className="capy-welcome">
      <section className="capy-welcome-card">
        <p className="capy-welcome-eyebrow">
          WELCOME TO
        </p>

        <h1 className="capy-welcome-title">
          DON'T OVERFLOW! 💧
        </h1>

        <p className="capy-welcome-subtitle">
          The cutest water challenge!
        </p>

        <div className="capy-welcome-character">
          <img
            src={capybaraWelcome}
            alt="Cappy tient un verre d'eau glacée"
          />
        </div>

        <h2 className="capy-welcome-message">
          Ready to play with me? 🦫
        </h2>

        <p className="capy-welcome-description">
          15 worlds · 75 levels · One big adventure!
        </p>

        <button
          type="button"
          className="capy-welcome-button"
          onClick={beginStory}
        >
          LET'S PLAY! ▶
        </button>
      </section>
    </main>
  )
}
