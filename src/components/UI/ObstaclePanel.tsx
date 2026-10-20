
import './ObstaclePanel.css'

type ObstaclePanelProps = {
  isBlockingFlow: boolean
  flowMultiplier: number
}

export function ObstaclePanel({
  isBlockingFlow,
  flowMultiplier,
}: ObstaclePanelProps) {
  return (
    <div
      className={`obstacle-panel ${
        isBlockingFlow
          ? 'obstacle-panel-active'
          : ''
      }`}
    >
      <div className="obstacle-panel-header">
        <span className="obstacle-panel-label">
          FLOW OBSTACLES
        </span>

        <span className="obstacle-panel-value">
          {isBlockingFlow
            ? 'DISRUPTED'
            : 'CLEAR'}
        </span>
      </div>

      <div className="obstacle-flow-info">
        FLOW {Math.round(flowMultiplier * 100)}%
      </div>
    </div>
  )
}
