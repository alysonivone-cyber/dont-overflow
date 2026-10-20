import type { LevelConfig } from '../game/types'
import { getLevelTip } from '../game/getLevelTip'
import { LevelInstructions } from './UI/LevelInstructions'
import { TimerPanel } from './UI/TimerPanel'
import { ReservePanel } from './UI/ReservePanel'
import { TemperaturePanel } from './UI/TemperaturePanel'
import { ObstaclePanel } from './UI/ObstaclePanel'
import { EventPanel } from './UI/EventPanel'
import { StatusIndicator } from './UI/StatusIndicator'

type Props = {
  currentLevel: LevelConfig
  hasTimeLimit: boolean
  hasWaterReserve: boolean
  hasInertia: boolean
  hasEnvironment: boolean
  hasObstacles: boolean
  hasMotion: boolean
  hasFrogs: boolean
  hasWarriors: boolean
  hasSurvivors: boolean
  hasMud: boolean
  attemptsLeft: number
  timerStarted: boolean
  timeLeft: number | null
  displayedTime: string
  waterReserve: number | null
  maximumWaterReserve: number | null
  displayedReserve: number
  reservePercentage: number
  displayedTemperature: number | null
  temperaturePercentage: number
  currentEvaporationRate: number
  obstacleEffect: { isBlockingFlow: boolean; flowMultiplier: number }
  isFilling: boolean
  frogInterference: { triggeredEvents: number; frogsInGlass: number }
  isInertiaActive: boolean
  isEvaporating: boolean
}

export default function GameInfoPanel({
  currentLevel,
  hasTimeLimit,
  hasWaterReserve,
  hasInertia,
  hasEnvironment,
  hasObstacles,
  hasMotion,
  hasFrogs,
  hasWarriors,
  hasSurvivors,
  hasMud,
  attemptsLeft,
  timerStarted,
  timeLeft,
  displayedTime,
  waterReserve,
  maximumWaterReserve,
  displayedReserve,
  reservePercentage,
  displayedTemperature,
  temperaturePercentage,
  currentEvaporationRate,
  obstacleEffect,
  isFilling,
  frogInterference,
  isInertiaActive,
  isEvaporating,
}: Props) {
  return (
    <>
        {/* ===============================================
            LEVEL HEADER
            =============================================== */}

        <p className="eyebrow">
          WORLD {currentLevel.world} • LEVEL{' '}
          {currentLevel.id}
        </p>

        <h1 className="game-title">
          DON'T OVERFLOW!
        </h1>

        <p className="game-subtitle">
          {currentLevel.name}
        </p>

        <div className="level-info">

         <LevelInstructions
            instruction={currentLevel.instruction}
            tip={getLevelTip({
              world: currentLevel.world,
              hasTimeLimit,
              hasWaterReserve,
              hasInertia,
              hasEnvironment,
              hasObstacles,
              hasMotion,
              hasFrogs,
              hasWarriors,
              hasSurvivors,
              hasMud,
            })}
          />

          <div className="attempts-counter">
            ATTEMPTS {attemptsLeft}/
            {currentLevel.attempts}
          </div>
        </div>

        {/* ===============================================
            WORLD 3 — TIMER
            =============================================== */}

        {hasTimeLimit && (
          <TimerPanel
            timerStarted={timerStarted}
            timeLeft={timeLeft}
            displayedTime={displayedTime}
            />
          )}

        {/* ===============================================
            WORLD 4 — WATER RESERVE
            =============================================== */}

        {hasWaterReserve &&
          waterReserve !== null &&
          maximumWaterReserve !== null && (
            <ReservePanel
              displayedReserve={
                displayedReserve
              }
              reservePercentage={
                reservePercentage
              }
            />
          )}

        {/* ===============================================
            WORLD 5 — TEMPERATURE
            =============================================== */}

        
        {hasEnvironment &&
          displayedTemperature !== null && (
            <TemperaturePanel
              displayedTemperature={displayedTemperature}
              temperaturePercentage={temperaturePercentage}
              currentEvaporationRate={currentEvaporationRate}
            />
         )}     

        {/* ===============================================
            WORLD 6 — OBSTACLES
            =============================================== */}
        
          {hasObstacles && (
          <ObstaclePanel
            isBlockingFlow={obstacleEffect.isBlockingFlow}
            flowMultiplier={obstacleEffect.flowMultiplier}
          />
        )}

        {/* ===============================================
            WORLD 7 — MOTION
            =============================================== */}
 
            {hasMotion && (
              <div style={{ visibility: isFilling ? 'visible' : 'hidden' }}>
                <EventPanel
                  label="CONTAINER MOTION"
                  value="ACTIVE"
                />
            </div>
          )}

        {/* ===============================================
            WORLD 8 — FROGS
            =============================================== */}

        {hasFrogs && (
          <div
            className="motion-panel"
            style={{
              visibility:
                frogInterference.triggeredEvents > 0
                  ? 'visible'
                  : 'hidden',
                }}
              >

          <div className="motion-panel-header">
            <span className="motion-panel-label">
              FROG INVASION
            </span>

          <span className="motion-panel-value">
            {frogInterference.frogsInGlass} 🐸
          </span>
        </div>
      </div>
    )}

        {/* ===============================================
            LIVE STATUS
            =============================================== */}
            <div className="live-status-slot">

            {isInertiaActive && (
              <StatusIndicator
                type="inertia"
                message="WATER STILL FLOWING..."
              />
            )}

            {isEvaporating && (
              <StatusIndicator
                type="evaporation"
                message="EVAPORATING..."
              />
            )}

            {hasObstacles &&
              obstacleEffect.isBlockingFlow &&
              isFilling && (
                <StatusIndicator
                  type="obstacle"
                  message="FLOW DISRUPTED"
                />
              )}
            </div>
    </>
  )
}
