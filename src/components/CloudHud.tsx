type Props = {
  showPercentage: boolean
  displayedLevel: number
  flowSpeed: number
}

/** Always-visible water and flow indicators for every level. */
export default function CloudHud({
  showPercentage,
  displayedLevel,
  flowSpeed,
}: Props) {
  return (
    <div className="cloud-hud">
      <div className="cloud cloud-pink">
        <span className="cloud-label">WATER</span>
        <span className="cloud-value">
          {showPercentage ? `${displayedLevel}%` : '???'}
        </span>
      </div>
      <div className="cloud cloud-blue">
        <span className="cloud-label">FLOW SPEED</span>
        <span className="cloud-value">{flowSpeed.toFixed(1)}%/s</span>
      </div>
    </div>
  )
}
