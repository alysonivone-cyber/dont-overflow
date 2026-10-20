
import frogAsset from '../assets/frog.png'

interface FrogFieldProps {
  frogCount: number
  obstruction: number
  isMartini?: boolean
  isNarrowConical?: boolean
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

const martiniFrogPositions = [
  {
    left: '50%',
    bottom: '12%',
    rotation: '-8deg',
  },
  {
    left: '50%',
    bottom: '30%',
    rotation: '8deg',
  },
  {
    left: '38%',
    bottom: '48%',
    rotation: '-5deg',
  },
  {
    left: '60%',
    bottom: '64%',
    rotation: '6deg',
  },
]

// =====================================================
// WORLD 14 - LEVEL 2: NARROW CONICAL GLASS
// =====================================================

const narrowConicalFrogPositions = [
  {
    left: '50%',
    bottom: '12%',
    rotation: '-8deg',
  },
  {
    left: '50%',
    bottom: '30%',
    rotation: '8deg',
  },
  {
    left: '45%',
    bottom: '48%',
    rotation: '-5deg',
  },
  {
    left: '55%',
    bottom: '64%',
    rotation: '6deg',
  },
]

function FrogField({
  frogCount,
  obstruction,
  isMartini = false,
  isNarrowConical = false,
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
        const position = isNarrowConical
          ? narrowConicalFrogPositions[index]
          : isMartini
          ? martiniFrogPositions[index]
          : frogPositions[index]

        return (
          <img
            key={index}
            src={frogAsset}
            alt=""
            draggable={false}
            style={{
              position: 'absolute',
              width: isNarrowConical ? '46px' : isMartini ? '48px' : '70px',
              height: isNarrowConical ? '46px' : isMartini ? '48px' : '70px',
              objectFit: 'contain',

              left: position.left,
              right: 'right' in position
                ? position.right
                : undefined,
              bottom: position.bottom,

              zIndex: 50,
              opacity: 1,

              transform: isNarrowConical
                ? `translateX(-50%) rotate(${position.rotation})`
                : isMartini
                ? `translateX(-50%) rotate(${position.rotation})`
                : `rotate(${position.rotation})`,

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
