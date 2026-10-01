interface GetEvaporationRateParams {
  baseRate: number
  currentTemperature: number
  initialTemperature: number
}

/**
 * Calculates the current evaporation rate.
 *
 * The level configuration defines the evaporation rate
 * at its initial temperature.
 *
 * If the water cools down, evaporation progressively
 * becomes weaker.
 */
export function getEvaporationRate({
  baseRate,
  currentTemperature,
  initialTemperature,
}: GetEvaporationRateParams): number {
  if (
    baseRate <= 0 ||
    currentTemperature <= 0 ||
    initialTemperature <= 0
  ) {
    return 0
  }

  const temperatureRatio =
    currentTemperature / initialTemperature

  return Math.max(
    baseRate * temperatureRatio,
    0,
  )
}