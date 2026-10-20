import type { ReactNode } from 'react'
import type { ContainerShape } from '../game/types'
import CloudHud from './CloudHud'

type GlassStageProps = {
  containerShape: ContainerShape
  isPhysicallyOverflowing: boolean
  hasGlassMovement: boolean
  finalGlassX: number
  finalGlassY: number
  finalGlassRotation: number
  isGlassHidden: boolean
  visualWaterLevel: number
  showTargetZone: boolean
  visualTargetMinimum: number
  visualTargetHeight: number
  showPercentage: boolean
  displayedLevel: number
  flowSpeed: number
  obstacles: ReactNode
  frogs: ReactNode
  warriors: ReactNode
}

/** Pure visual representation of the container and its overlays. */
export default function GlassStage({
  containerShape, isPhysicallyOverflowing, hasGlassMovement,
  finalGlassX, finalGlassY, finalGlassRotation, isGlassHidden,
  visualWaterLevel, showTargetZone, visualTargetMinimum, visualTargetHeight,
  showPercentage, displayedLevel, flowSpeed, obstacles, frogs, warriors,
}: GlassStageProps) {
  return (
    <div className="container">
      {isPhysicallyOverflowing && (
        <div className="overflow-puddle" aria-hidden="true" />
      )}

      <div
        className={`glass glass-${containerShape} ${hasGlassMovement ? 'glass-motion' : ''}`}
        style={{
          ...(hasGlassMovement ? {
            transform: `translate(${finalGlassX}px, ${finalGlassY}px) rotate(${finalGlassRotation}deg)`,
          } : {}),
          opacity: isGlassHidden ? 0 : 1,
          transition: isGlassHidden ? 'opacity 0.12s ease' : undefined,
        }}
      >
        <div className="water" style={{ height: `${Math.min(visualWaterLevel, 100)}%` }} />
        {showTargetZone && (
          <div
            className="target-zone"
            style={{ bottom: `${visualTargetMinimum}%`, height: `${visualTargetHeight}%` }}
          >
            <span>TARGET</span>
          </div>
        )}
        {obstacles}
        {frogs}
      </div>

      {isPhysicallyOverflowing && (
        <div
          className="overflow-droplets"
          aria-hidden="true"
          style={{
            transform: `translate(${finalGlassX}px, ${finalGlassY}px)`,
            opacity: isGlassHidden ? 0 : 1,
          }}
        >
          <span className="overflow-drop overflow-drop-left" />
          <span className="overflow-drop overflow-drop-right" />
          <span className="overflow-drop overflow-drop-left-small" />
          <span className="overflow-drop overflow-drop-right-small" />
        </div>
      )}

      <CloudHud showPercentage={showPercentage} displayedLevel={displayedLevel} flowSpeed={flowSpeed} />
      {warriors}
    </div>
  )
}
