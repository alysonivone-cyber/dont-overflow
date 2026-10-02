// =====================================================
// GLOBAL GAME TYPES
// =====================================================

export type GameResult =
  | 'waiting'
  | 'TOO LOW'
  | 'SUCCESS'
  | 'PERFECT'
  | 'OVERFLOW'

// =====================================================
// FLOW TYPES
// =====================================================

export type FlowType =
  | 'constant'
  | 'accelerating'
  | 'variable'

// =====================================================
// CONTAINER SHAPES
// =====================================================

export type ContainerShape =
  | 'straight'
  | 'wide'
  | 'conical'
  | 'martini'

// =====================================================
// WORLD 5 — ENVIRONMENT
// =====================================================

export type TemperatureMode =
  | 'fixed'
  | 'cooling'

// =====================================================
// WORLD 6 — OBSTACLES
// =====================================================

export type ObstacleMode =
  | 'fixed'
  | 'double'
  | 'moving'
  | 'blind'

// =====================================================
// WORLD 7 — MOTION
// =====================================================

export type MotionMode =
  | 'horizontal'
  | 'pendulum'
  | 'vertical'
  | 'combined'

// =====================================================
// WORLD 8 — FROG INVASION
// =====================================================

export type FrogMode =
  | 'single'
  | 'double'
  | 'in-out'
  | 'invasion'
  | 'apocalypse'

// =====================================================
// LEVEL CONFIGURATION
// =====================================================

export interface LevelConfig {
  // ---------------------------------------------------
  // Identification
  // ---------------------------------------------------

  id: number
  world: number
  name: string
  instruction: string

  // ---------------------------------------------------
  // Objective
  // ---------------------------------------------------

  target: number
  tolerance: number

  // ---------------------------------------------------
  // Filling
  // ---------------------------------------------------

  fillSpeed: number
  flowType: FlowType

  // ---------------------------------------------------
  // Attempts
  // ---------------------------------------------------

  attempts: number

  // ---------------------------------------------------
  // World 3 — Pressure
  // ---------------------------------------------------

  timeLimit: number | null

  // ---------------------------------------------------
  // World 4 — Control
  // ---------------------------------------------------

  waterReserve: number | null
  inertia: number

  // ---------------------------------------------------
  // Visual information
  // ---------------------------------------------------

  showPercentage: boolean
  showTargetZone: boolean
  containerShape: ContainerShape

  // ---------------------------------------------------
  // World 5 — Environment
  // ---------------------------------------------------

  temperature?: number
  temperatureMode?: TemperatureMode
  evaporationRate?: number
  evaporationDuration?: number

  // ---------------------------------------------------
  // World 6 — Obstacles
  // ---------------------------------------------------

  obstacleMode?: ObstacleMode
  obstacleStrength?: number
  obstaclePositions?: number[]
  obstacleMovementSpeed?: number
  blindSpotSize?: number

  // ---------------------------------------------------
  // World 7 — Motion
  // ---------------------------------------------------

  motionMode?: MotionMode
  motionAmplitude?: number
  motionSpeed?: number

  // ---------------------------------------------------
  // World 8 — Frog Invasion
  // ---------------------------------------------------

  frogMode?: FrogMode

  // Times, in seconds, when frogs interact with the glass.
  frogTriggerTimes?: number[]

  // Water displacement caused by each frog entering the glass.
  frogDisplacement?: number

  // Water removed when a frog leaves the glass.
  frogExitDisplacement?: number

  // How much the frogs visually obstruct the water.
  frogObstruction?: number

  // Optional glass shake caused by the frogs.
  frogShakeStrength?: number
}