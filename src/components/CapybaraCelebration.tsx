
import { useEffect, useRef, useState } from 'react'
import './CapybaraCelebration.css'
import capybaraChampion from '../assets/capybaras/capybara-champion.png'

type Props = {
  onFinished: () => void
}

type Phase = 'dance' | 'medal' | 'podium'

const confetti = Array.from({ length: 65 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  delay: `${((i * 13) % 31) / 10}s`,
  duration: `${3 + ((i * 7) % 25) / 10}s`,
  color: [
    '#ff7ca9',
    '#55c9f5',
    '#f9c74f',
    '#79d6a5',
    '#bd8af7',
  ][i % 5],
}))

export default function CapybaraCelebration({
  onFinished,
}: Props) {
  const [phase, setPhase] = useState<Phase>('dance')

  const musicRef = useRef<HTMLAudioElement | null>(null)
  const [musicEnabled, setMusicEnabled] = useState(false)

  // ========================================
  // VICTORY MUSIC
  // ========================================

  useEffect(() => {
    const music = musicRef.current
    if (!music) return

    music.volume = 0.45

    void music.play()
      .then(() => setMusicEnabled(true))
      .catch(() => setMusicEnabled(false))

    return () => {
      music.pause()
      music.currentTime = 0
    }
  }, [])

  // ========================================
  // MUSIC ON / OFF
  // ========================================

  const toggleMusic = () => {
    const music = musicRef.current
    if (!music) return

    if (music.paused) {
      void music.play()
        .then(() => setMusicEnabled(true))
        .catch(() => setMusicEnabled(false))
    } else {
      music.pause()
      setMusicEnabled(false)
    }
  }

  // ========================================
  // CELEBRATION ANIMATION PHASES
  // ========================================

  useEffect(() => {
    // Dance → Medal
    const medalTimer = window.setTimeout(
      () => setPhase('medal'),
      3800,
    )

    // Medal → Podium
    const podiumTimer = window.setTimeout(
      () => setPhase('podium'),
      7900,
    )

    // Podium → Final cinematic
    const endingTimer = window.setTimeout(
      () => onFinished(),
      14000,
    )

    return () => {
      window.clearTimeout(medalTimer)
      window.clearTimeout(podiumTimer)
      window.clearTimeout(endingTimer)
    }
  }, [onFinished])

  // ========================================
  // CELEBRATION SCREEN
  // ========================================

  return (
    <main className="capy-celebration">
      <audio
        ref={musicRef}
        src="/capybara-victory.mp3"
        preload="auto"
        loop
      />

      <div
        className="capy-confetti"
        aria-hidden="true"
      >
        {confetti.map((piece, i) => (
          <i
            key={i}
            style={{
              left: piece.left,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
              backgroundColor: piece.color,
            }}
          />
        ))}
      </div>

      <section
        className={`capy-stage capy-phase-${phase}`}
      >
        <p className="capy-eyebrow">
          WORLD 15 • LEVEL 5 COMPLETE
        </p>

        <h1>YOU DID IT! 🎉</h1>

        <p className="capy-subtitle">
          75 levels. 15 worlds.
          One legendary champion!
        </p>

        <div className="capy-scene">
          <div className="capy-character">
            <img
              src={capybaraChampion}
              alt="Le capybara célèbre la victoire"
            />
          </div>
        </div>

        <button
          type="button"
          className="capy-music-button"
          onClick={toggleMusic}
        >
          {musicEnabled
            ? '🔊 MUSIC ON'
            : '🎵 PLAY MUSIC'}
        </button>

        <p className="capy-caption">
          {phase === 'dance'
            ? 'Our champion is dancing for you!'
            : phase === 'medal'
              ? 'You earned the gold medal!'
              : 'THE ULTIMATE CHAMPION!'}
        </p>
      </section>
    </main>
  )
}
