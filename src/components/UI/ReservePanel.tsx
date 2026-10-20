import './ReservePanel.css'

export function ReservePanel({
  reservePercentage,
  displayedReserve,
}: {
  reservePercentage: number
  displayedReserve: number
}) {
  return (
    <div className="reserve-panel">
      <div className="reserve-header">
        <span className="reserve-label">WATER RESERVE</span>
        <span className="reserve-value">{displayedReserve}%</span>
      </div>

      <div className="reserve-track">
        <div
          className="reserve-fill"
          style={{ width: `${reservePercentage}%` }}
        />
      </div>
    </div>
  )
}
