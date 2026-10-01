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

export interface LevelConfig {
  // Identification
  id: number
  world: number
  name: string
  instruction: string

  // Objectif
  target: number
  tolerance: number

  // Remplissage
  fillSpeed: number
  flowType: FlowType

  // Ressources
  attempts: number
  timeLimit: number | null
  waterReserve: number | null

  // Aides visuelles
  showPercentage: boolean
  showTargetZone: boolean

  // Récipient
  containerShape: ContainerShape

  // Mécaniques avancées
  inertia: number

  // Environnement — World 5
  // Optional so Worlds 1–4 do not need these properties.
  temperature?: number
  temperatureMode?: TemperatureMode
  evaporationRate?: number
  evaporationDuration?: number
}