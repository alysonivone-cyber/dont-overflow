
import './EventPanel.css'

type EventPanelProps = {
  label: string
  value: string | number
}

export function EventPanel({
  label,
  value,
}: EventPanelProps) {
  return (
    <div className="motion-panel">
      <div className="motion-panel-header">
        <span className="motion-panel-label">
          {label}
        </span>

        <span className="motion-panel-value">
          {value}
        </span>
      </div>
    </div>
  )
}
