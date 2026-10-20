
type LevelTipOptions = {
  world: number
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
}

export function getLevelTip({
  world,
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
}: LevelTipOptions): string | undefined {
  // Advanced worlds with combined mechanics
  if (world >= 14) {
    return 'Multiple hazards are active • Watch the glass and adapt your timing'
  }

  if (hasMud) {
    return 'Mud can obscure your view • Estimate the water level carefully'
  }

  if (hasSurvivors) {
    return 'Aftershocks can disrupt your control • Stay alert'
  }

  if (hasWarriors) {
    return 'Warriors can move or hide the glass • Anticipate their interference'
  }

  if (hasFrogs) {
    return 'Frogs can change the water level • Stay alert'
  }

  if (hasMotion) {
    return 'The container moves • Time your stop carefully'
  }

  if (hasObstacles) {
    return 'Obstacles disrupt the flow • Adapt your timing'
  }

  if (hasEnvironment) {
    return 'Heat causes evaporation • Anticipate the water loss'
  }

  if (hasInertia) {
    return 'Water keeps moving after you stop • Anticipate momentum'
  }

  if (hasWaterReserve) {
    return 'Your water supply is limited • Every drop counts'
  }

  if (hasTimeLimit) {
    return 'The clock is ticking • Reach the target in time'
  }

  return undefined
}
