
import './TimerPanel.css'

type TimerPanelProps = {
  timerStarted: boolean
  timeLeft: number | null
  displayedTime: string
}

export function TimerPanel({
  timerStarted,
  timeLeft,
  displayedTime,
}: TimerPanelProps) {
  return (
    <div
      className={`timer-display ${
        timerStarted ? 'timer-running' : 'timer-ready'
      } ${
        timeLeft !== null && timeLeft <= 1
          ? 'timer-danger'
          : ''
      }`}
    >
      <span className="timer-label">TIME</span>
      <span className="timer-value">
        {displayedTime}s
      </span>
    </div>
  )
}
