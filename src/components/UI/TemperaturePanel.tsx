
import './TemperaturePanel.css'

type TemperaturePanelProps = {
  displayedTemperature: number
  temperaturePercentage: number
  currentEvaporationRate: number
}

export function TemperaturePanel({
  displayedTemperature,
  temperaturePercentage,
  currentEvaporationRate,
}: TemperaturePanelProps) {
  return (
    <div className="temperature-panel">
      <div className="temperature-header">
        <span className="temperature-label">
          TEMPERATURE
        </span>

        <span className="temperature-value">
          {displayedTemperature}°C
        </span>
      </div>

      <div className="temperature-scale">
        <span>COLD</span>

        <div className="temperature-track">
          <div
            className="temperature-fill"
            style={{
              width: `${temperaturePercentage}%`,
            }}
          />

          <div
            className="temperature-marker"
            style={{
              left: `${temperaturePercentage}%`,
            }}
          />
        </div>

        <span>HOT</span>
      </div>

      <div className="evaporation-info">
        EVAPORATION{' '}
        {currentEvaporationRate.toFixed(1)}
        % / s
      </div>
    </div>
  )
}
