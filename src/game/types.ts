export type GameResult =
  | 'waiting'
  | 'TOO LOW'
  | 'SUCCESS'
  | 'PERFECT'
  | 'OVERFLOW'

export type FlowType =
  | 'constant'
  | 'accelerating'
  | 'variable'

export type ContainerShape =
  | 'straight'
  | 'wide'
  | 'conical'
  | 'martini'

export type TemperatureMode =
  | 'fixed'
  | 'cooling'

export type ObstacleMode =
  | 'fixed'
  | 'double'
  | 'moving'
  | 'blind'

export interface LevelConfig {
  // Identification
  id: number
  world: number
  name: string
  instruction: string

  // Objective
  target: number
  tolerance: number

  // Filling
  fillSpeed: number
  flowType: FlowType

  // Resources
  attempts: number
  timeLimit: number | null
  waterReserve: number | null

  // Visual helpers
  showPercentage: boolean
  showTargetZone: boolean

  // Container
  containerShape: ContainerShape

  // Advanced mechanics
  inertia: number

  // World 5 — Environment
  temperature?: number
  temperatureMode?: TemperatureMode
  evaporationRate?: number
  evaporationDuration?: number

  // World 6 — Obstacles
  obstacleMode?: ObstacleMode
  obstacleStrength?: number
  obstaclePositions?: number[]
  obstacleMovementSpeed?: number
  blindSpotSize?: number
}