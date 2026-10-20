import successSound from '../assets/sounds/success.wav'
import errorSound from '../assets/sounds/error.wav'
import gameOverSound from '../assets/sounds/game-over.wav'
import mudSplatSound from '../assets/sounds/mud-splat.wav'
import overflowSound from '../assets/sounds/overflow.wav'
import floodSound from '../assets/sounds/flood.wav'
import backgroundMusicFile from '../assets/sounds/background-music.mp3'
import frogCroakSound from '../assets/sounds/frog-croak.wav'
import warriorHornSound from '../assets/sounds/warrior-horn.wav'

// =====================================================
// WELCOME & MENU MUSIC
// =====================================================

const welcomeMusic = new Audio('/capybara-welcome.wav')

welcomeMusic.loop = true
welcomeMusic.volume = 0.25

export function playWelcomeMusic() {
  // Arrêter la musique du gameplay
  backgroundMusic.pause()

  // Si la musique d'accueil joue déjà, ne rien changer
  if (!welcomeMusic.paused) return

  // Sinon, démarrer la musique d'accueil
  welcomeMusic.play().catch(() => {})
}

export function stopWelcomeMusic() {
  welcomeMusic.pause()
  welcomeMusic.currentTime = 0
}

// =====================================================
// BACKGROUND MUSIC — DON'T OVERFLOW!
// =====================================================

const backgroundMusic = new Audio(backgroundMusicFile)

backgroundMusic.loop = true
backgroundMusic.volume = 0.12

export function playBackgroundMusic() {
  stopWelcomeMusic()

  if (!backgroundMusic.paused) {
    return
  }

  backgroundMusic.play().catch(() => {})
}

export function pauseBackgroundMusic() {
  backgroundMusic.pause()
}

export function stopBackgroundMusic() {
  backgroundMusic.pause()
  backgroundMusic.currentTime = 0
}

const sounds = {
  success: new Audio(successSound),
  error: new Audio(errorSound),
  gameOver: new Audio(gameOverSound),
  mudSplat: new Audio(mudSplatSound),
  overflow: new Audio(overflowSound),
  flood: new Audio(floodSound),
}

function playSound(audio: HTMLAudioElement) {
  audio.pause()
  audio.currentTime = 0

  audio.play().catch(() => {
    // Le navigateur peut bloquer un son
    // s'il n'a pas encore reçu d'interaction utilisateur.
  })
}

export function playSuccessSound() {
  playSound(sounds.success)
}

export function playErrorSound() {
  playSound(sounds.error)
}

export function playGameOverSound() {
  playSound(sounds.gameOver)
}

export function playMudSplatSound() {
  playSound(sounds.mudSplat)
}

// Sound when water spills out of the glass
export function playOverflowSound() {
  playSound(sounds.overflow)
}

// Sound when water floods the entire screen
export function playFloodSound() {
  playSound(sounds.flood)
}

// =====================================================
// FROG & WARRIOR SOUND EFFECTS
// =====================================================

const frogCroakAudio = new Audio(frogCroakSound)
frogCroakAudio.volume = 1.0

const warriorHornAudio = new Audio(warriorHornSound)
warriorHornAudio.volume = 1.0

export function playFrogCroakSound() {
  frogCroakAudio.currentTime = 0
  frogCroakAudio.play().catch(() => {})
}

export function playWarriorHornSound() {
  warriorHornAudio.currentTime = 0
  warriorHornAudio.play().catch(() => {})
}