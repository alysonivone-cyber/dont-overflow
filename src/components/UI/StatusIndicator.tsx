
import './StatusIndicator.css'

type StatusType = 'inertia' | 'evaporation' | 'obstacle'

type StatusIndicatorProps = {
  type: StatusType
  message: string
}

export function StatusIndicator({
  type,
  message,
}: StatusIndicatorProps) {
  return (
    <div className={`status-indicator status-${type}`}>
      {message}
    </div>
  )
}
