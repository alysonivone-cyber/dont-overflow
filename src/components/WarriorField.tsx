import type { WarriorMode } from '../game/types'

import warriorRunning from '../assets/warriors/warrior-running.png'
import warriorPushing from '../assets/warriors/warrior-pushing.png'
import warriorStealing from '../assets/warriors/warrior-stealing.png'
import warriorBlocking from '../assets/warriors/warrior-blocking.png'

interface WarriorFieldProps {
  mode: WarriorMode
  visible: boolean
  progress: number
  obstruction: number
  glassHidden: boolean
  triggeredEvents: number
}

function WarriorField({
  mode,
  visible,
  progress,
  obstruction,
  glassHidden,
  triggeredEvents,
}: WarriorFieldProps) {
  if (!visible) {
    return null
  }

  const safeProgress = Math.max(
    0,
    Math.min(progress, 1),
  )

  let warriorAsset = warriorRunning

  if (mode === 'push') {
    warriorAsset = warriorPushing
  }

  if (mode === 'steal') {
    warriorAsset = warriorStealing
  }

  if (mode === 'obstruction') {
    warriorAsset = warriorBlocking
  }

  if (mode === 'war-zone') {
    const eventIndex = Math.max(
      triggeredEvents - 1,
      0,
    )

    const eventType = eventIndex % 4

    if (eventType === 0) {
      warriorAsset = warriorRunning
    }

    if (eventType === 1) {
      warriorAsset = warriorPushing
    }

    if (eventType === 2) {
      warriorAsset = warriorStealing
    }

    if (eventType === 3) {
      warriorAsset = warriorBlocking
    }
  }

  const isCrossing =
    mode === 'crossing' ||
    (
      mode === 'war-zone' &&
      Math.max(
        triggeredEvents - 1,
        0,
      ) %
        4 ===
        0
    )

  const warriorX = isCrossing
    ? -180 + safeProgress * 520
    : 0

  return (
    <div
      className="warrior-field"
      aria-hidden="true"
    >
      <img
        className={`warrior-image ${
          isCrossing
            ? 'warrior-image-crossing'
            : 'warrior-image-centered'
        }`}
        src={warriorAsset}
        alt=""
        draggable={false}
        style={
          isCrossing
            ? {
                transform: `translateX(${warriorX}px)`,
              }
            : undefined
        }
      />

      {obstruction > 0 && (
        <div
          className="warrior-obstruction"
          style={{
            height: `${Math.min(
              obstruction,
              100,
            )}%`,
          }}
        />
      )}

      {glassHidden && (
        <div className="warrior-steal-indicator">
          GLASS STOLEN!
        </div>
      )}
    </div>
  )
}

export default WarriorField