import frogAsset from '../assets/frog.png'

interface FrogFieldProps {
  frogCount: number
  obstruction: number
}

const frogPositions = [
  {
    left: '12%',
    bottom: '12%',
    rotation: '-8deg',
  },
  {
    right: '10%',
    bottom: '30%',
    rotation: '8deg',
  },
  {
    left: '35%',
    bottom: '48%',
    rotation: '-5deg',
  },
  {
    right: '25%',
    bottom: '64%',
    rotation: '6deg',
  },
]

function FrogField({
  frogCount,
  obstruction,
}: FrogFieldProps) {
  const visibleFrogs = Math.max(
    0,
    Math.min(frogCount, 4),
  )

  return (
    <>
      {Array.from({
        length: visibleFrogs,
      }).map((_, index) => {
        const position =
          frogPositions[index]

        return (
          <img
            key={index}
            src={frogAsset}
            alt=""
            draggable={false}
            style={{
              position: 'absolute',
              width: '70px',
              height: '70px',
              objectFit: 'contain',

              left: position.left,
              right: position.right,
              bottom: position.bottom,

              zIndex: 50,
              opacity: 1,

              transform: `rotate(${position.rotation})`,

              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        )
      })}

      {obstruction > 0 && (
        <div
          className="frog-obstruction"
          style={{
            height: `${obstruction}%`,
          }}
        />
      )}
    </>
  )
}

export default FrogField