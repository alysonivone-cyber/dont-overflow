export type MotionMode =
  | 'horizontal'
  | 'pendulum'
  | 'vertical'
  | 'combined'

interface GetContainerMotionParams {
  elapsedTime: number
  mode: MotionMode
  amplitude: number
  speed: number
}

export interface ContainerMotion {
  x: number
  y: number
  rotation: number
}

export function getContainerMotion({
  elapsedTime,
  mode,
  amplitude,
  speed,
}: GetContainerMotionParams): ContainerMotion {
  const safeAmplitude = Math.max(
    0,
    Math.min(amplitude, 40),
  )

  const safeSpeed = Math.max(
    0,
    Math.min(speed, 8),
  )

  const wave =
    Math.sin(
      elapsedTime * safeSpeed,
    )

  switch (mode) {
    case 'horizontal':
      return {
        x: wave * safeAmplitude,
        y: 0,
        rotation: 0,
      }

    case 'pendulum':
      return {
        x: wave * safeAmplitude,
        y: 0,
        rotation: wave * 6,
      }

    case 'vertical':
      return {
        x: 0,
        y: wave * safeAmplitude * 0.45,
        rotation: 0,
      }

    case 'combined': {
      const secondWave =
        Math.cos(
          elapsedTime *
            safeSpeed *
            1.35,
        )

      return {
        x: wave * safeAmplitude,
        y:
          secondWave *
          safeAmplitude *
          0.35,
        rotation: wave * 5,
      }
    }

    default:
      return {
        x: 0,
        y: 0,
        rotation: 0,
      }
  }
}