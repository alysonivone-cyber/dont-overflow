type Props = {
  floodProgress: number
  floodHeight: number
  showBlackout: boolean
  blackoutOpacity: number
}

/** Full-screen effects, kept separate from the game simulation. */
export default function GameEffectsOverlay({
  floodProgress,
  floodHeight,
  showBlackout,
  blackoutOpacity,
}: Props) {
  return (
    <>
      {floodProgress > 0 && (
        <div
          className="flood-overlay"
          aria-hidden="true"
          style={{ height: `${floodHeight}%` }}
        >
          <div className="flood-wave" />
          <span className="flood-bubble flood-bubble-1" />
          <span className="flood-bubble flood-bubble-2" />
          <span className="flood-bubble flood-bubble-3" />
          <span className="flood-bubble flood-bubble-4" />
          <span className="flood-bubble flood-bubble-5" />
        </div>
      )}
      {showBlackout && (
        <div
          className="survivor-blackout"
          style={{ opacity: blackoutOpacity }}
          aria-hidden="true"
        />
      )}
    </>
  )
}
