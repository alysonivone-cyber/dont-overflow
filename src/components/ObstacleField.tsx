interface ObstacleFieldProps {
  positions: number[]
  moving: boolean
  blindSpotSize: number
  isBlockingFlow: boolean
}

function ObstacleField({
  positions,
  moving,
  blindSpotSize,
  isBlockingFlow,
}: ObstacleFieldProps) {
  return (
    <>
      {/* PHYSICAL OBSTACLES */}

      {positions.map((position, index) => (
        <div
          key={`${index}-${position}`}
          className={[
            'flow-obstacle',
            moving ? 'flow-obstacle-moving' : '',
            isBlockingFlow
              ? 'flow-obstacle-active'
              : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            bottom: `${position}%`,
          }}
          aria-hidden="true"
        >
          <span className="obstacle-slot" />
          <span className="obstacle-slot" />
          <span className="obstacle-slot" />
        </div>
      ))}

      {/* VISUAL OCCLUSION */}

      {blindSpotSize > 0 && (
        <div
          className="blind-spot"
          style={{
            height: `${blindSpotSize}%`,
          }}
          aria-hidden="true"
        >
          <span>VISIBILITY BLOCKED</span>
        </div>
      )}
    </>
  )
}

export default ObstacleField