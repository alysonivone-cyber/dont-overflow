import type { GameResult, FrogMode, ObstacleMode } from '../game/types'

type Props = {
  isInertiaActive: boolean
  isEvaporating: boolean
  result: GameResult
  hasFrogs: boolean
  frogMode: FrogMode | undefined
  frogsInGlass: number
  frogTriggeredEvents: number
  frogIsActive: boolean
  hasObstacles: boolean
  obstacleIsBlockingFlow: boolean
  blindSpotSize: number
  obstacleMode: ObstacleMode | undefined
  hasEnvironment: boolean
  hasTimeLimit: boolean
  timerStarted: boolean
  hasWaterReserve: boolean
  hasInertia: boolean
  hasMotion: boolean
}

/** Displays contextual guidance without changing gameplay state. */
export default function PlayerHint({
  isInertiaActive,
  isEvaporating,
  result,
  hasFrogs,
  frogMode,
  frogsInGlass,
  frogTriggeredEvents,
  frogIsActive,
  hasObstacles,
  obstacleIsBlockingFlow,
  blindSpotSize,
  obstacleMode,
  hasEnvironment,
  hasTimeLimit,
  timerStarted,
  hasWaterReserve,
  hasInertia,
  hasMotion,
}: Props) {
  return (
    <p className="hint">
      {isInertiaActive
            ? 'You released the button, but momentum is still pushing water.'
            : isEvaporating
              ? 'Wait for evaporation to finish before the final result.'
              : result === 'waiting'
                ? hasFrogs
                  ? frogMode === 'in-out'
                    ? frogsInGlass > 0
                      ? 'The frog is inside • Remember that it can jump back out'
                      : frogTriggeredEvents >= 2
                        ? 'The frog escaped • The water level dropped again'
                        : 'Keep pouring • A frog is about to interfere'
                    : frogIsActive
                      ? 'Frogs displace water • Adapt before you release'
                      : 'Keep pouring • The frogs are coming'
                  : hasObstacles
                    ? obstacleIsBlockingFlow
                      ? 'Obstacle contact • The water flow is currently disrupted'
                      : blindSpotSize > 0
                        ? 'Obstacles alter the flow • Hidden areas force you to estimate the level'
                        : obstacleMode === 'moving'
                          ? 'The barrier moves • Its position changes the flow in real time'
                          : 'Obstacles alter the flow • Adapt your timing'
                    : hasEnvironment
                      ? 'Heat causes evaporation • Anticipate the water loss'
                      : hasTimeLimit && !timerStarted
                        ? 'The timer starts when you begin filling.'
                        : hasWaterReserve
                          ? hasInertia
                            ? 'Every drop counts • Release early to anticipate momentum'
                            : 'Every drop counts • Your reserve carries across attempts'
                          : hasMotion
                            ? 'The container moves • Keep control of your timing'
                            : 'Hold to fill • Release to stop'
                : 'Try again before you run out of attempts.'}
    </p>
  )
}
