import successSound from '../assets/sounds/success.wav'
import errorSound from '../assets/sounds/error.wav'
import gameOverSound from '../assets/sounds/game-over.wav'

const sounds = {
  success: new Audio(successSound),
  error: new Audio(errorSound),
  gameOver: new Audio(gameOverSound),
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