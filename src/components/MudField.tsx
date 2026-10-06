interface MudFieldProps {
  splashCount: number
  coverage: number
  intensity: number
  megaSplash?: boolean
}

const mudSplashes = [
  // MAIN SPLASH — always centered on the glass
  {
    left: '50%',
    top: '50%',
    rotation: -8,
    scale: 1.65,
    main: true,
  },

  // Secondary splashes around the screen
  {
    right: '8%',
    top: '28%',
    rotation: 22,
    scale: 0.82,
    main: false,
  },
  {
    left: '19%',
    bottom: '12%',
    rotation: 12,
    scale: 1.05,
    main: false,
  },
  {
    right: '17%',
    bottom: '8%',
    rotation: -28,
    scale: 0.92,
    main: false,
  },
  {
    left: '38%',
    top: '8%',
    rotation: 35,
    scale: 0.72,
    main: false,
  },
  {
    right: '34%',
    bottom: '26%',
    rotation: -12,
    scale: 0.95,
    main: false,
  },
  {
    left: '12%',
    top: '38%',
    rotation: 18,
    scale: 0.78,
    main: false,
  },
]

function MudField({
  splashCount,
  coverage,
  intensity,
  megaSplash = false,
}: MudFieldProps) {
  const visibleSplashes = Math.max(
    0,
    Math.min(
      splashCount,
      mudSplashes.length,
    ),
  )

  const baseSize =
    55 + coverage * 1.15

  return (
    <div
      className="mud-field"
      aria-hidden="true"
    >
      {Array.from({
        length: visibleSplashes,
      }).map((_, index) => {
        const splash =
          mudSplashes[index]

        const isMegaSplash =
          megaSplash &&
          index ===
            visibleSplashes - 1 &&
          splashCount >= 7

        const size =
          isMegaSplash
            ? baseSize * 3.6
            : baseSize *
              splash.scale

        return (
          <div
            key={index}
            className={`mud-splash mud-splash-${
              index + 1
            } ${
              splash.main
                ? 'mud-splash-main'
                : ''
            } ${
              isMegaSplash
                ? 'mud-splash-mega'
                : ''
            }`}
            style={{
              width: `${size}px`,
              height: `${size * 0.72}px`,

              left:
                isMegaSplash
                  ? '50%'
                  : splash.left,

              right:
                isMegaSplash
                  ? undefined
                  : splash.right,

              top:
                isMegaSplash
                  ? '50%'
                  : splash.top,

              bottom:
                isMegaSplash
                  ? undefined
                  : splash.bottom,

              opacity: Math.max(
                0.45,
                Math.min(
                  intensity,
                  1,
                ),
              ),

              transform:
                isMegaSplash
                  ? `translate(-50%, -50%) rotate(${splash.rotation}deg)`
                  : splash.main
                    ? `translate(-50%, -50%) rotate(${splash.rotation}deg)`
                    : `rotate(${splash.rotation}deg)`,

              zIndex:
                isMegaSplash
                  ? 20
                  : splash.main
                    ? 10
                    : index + 1,
            }}
          >
            <span className="mud-drop mud-drop-a" />
            <span className="mud-drop mud-drop-b" />
            <span className="mud-drop mud-drop-c" />
          </div>
        )
      })}
    </div>
  )
}

export default MudField