import type { LevelConfig } from './types'

export const levels: LevelConfig[] = [
  // =====================================================
  // WORLD 1 — CALIBRATION
  // =====================================================

  {
    id: 1,
    world: 1,
    name: 'First Fill',
    instruction:
      'Hold to fill. Release inside the target zone.',

    target: 75,
    tolerance: 5,

    fillSpeed: 30,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,
  },

  {
    id: 2,
    world: 1,
    name: 'Narrower Target',
    instruction:
      'The target is narrower. Stop between 61% and 69%.',

    target: 65,
    tolerance: 4,

    fillSpeed: 30,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,
  },

  {
    id: 3,
    world: 1,
    name: 'Aim Lower',
    instruction:
      'The target has moved lower. Stop between 42% and 48%.',

    target: 45,
    tolerance: 3,

    fillSpeed: 30,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,
  },

  {
    id: 4,
    world: 1,
    name: 'Quick Stop',
    instruction:
      'The water flows faster. React quickly and hit the target.',

    target: 80,
    tolerance: 3,

    fillSpeed: 38,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,
  },

  {
    id: 5,
    world: 1,
    name: 'Calibration Test',
    instruction:
      'Final calibration test. Stop between 56% and 60%.',

    target: 58,
    tolerance: 2,

    fillSpeed: 34,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,
  },

  // =====================================================
  // WORLD 2 — PERCEPTION
  // =====================================================

  {
    id: 1,
    world: 2,
    name: 'Looks Can Deceive',
    instruction:
      'The container has changed. Do not trust height alone.',

    target: 70,
    tolerance: 5,

    fillSpeed: 30,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'wide',

    inertia: 0,
  },

  {
    id: 2,
    world: 2,
    name: 'Changing Shape',
    instruction:
      'The shape changes how the water level appears.',

    target: 60,
    tolerance: 4,

    fillSpeed: 30,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'conical',

    inertia: 0,
  },

  {
    id: 3,
    world: 2,
    name: 'Trust the Volume',
    instruction:
      'Visual height can be misleading. Judge the fill carefully.',

    target: 50,
    tolerance: 4,

    fillSpeed: 32,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'martini',

    inertia: 0,
  },

  {
    id: 4,
    world: 2,
    name: 'No Numbers',
    instruction:
      'The percentage is hidden. Rely on your perception.',

    target: 65,
    tolerance: 3,

    fillSpeed: 32,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'conical',

    inertia: 0,
  },

  {
    id: 5,
    world: 2,
    name: 'Perception Test',
    instruction:
      'Final perception challenge. Read the container, not just the height.',

    target: 75,
    tolerance: 3,

    fillSpeed: 34,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'martini',

    inertia: 0,
  },

  // =====================================================
  // WORLD 3 — PRESSURE
  // =====================================================

  {
    id: 1,
    world: 3,
    name: 'Against the Clock',
    instruction:
      'The clock is running. Reach the target before time runs out.',

    target: 65,
    tolerance: 5,

    fillSpeed: 30,
    flowType: 'constant',

    attempts: 3,
    timeLimit: 4,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,
  },

  {
    id: 2,
    world: 3,
    name: 'Speeding Up',
    instruction:
      'The flow accelerates as the container fills. Adapt your timing.',

    target: 72,
    tolerance: 4,

    fillSpeed: 28,
    flowType: 'accelerating',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,
  },

  {
    id: 3,
    world: 3,
    name: 'Changing Rhythm',
    instruction:
      'The flow changes speed while you fill. Learn its rhythm.',

    target: 60,
    tolerance: 4,

    fillSpeed: 34,
    flowType: 'variable',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,
  },

  {
    id: 4,
    world: 3,
    name: 'Under Pressure',
    instruction:
      'The flow accelerates and the clock is running. Stay precise.',

    target: 78,
    tolerance: 3,

    fillSpeed: 30,
    flowType: 'accelerating',

    attempts: 3,
    timeLimit: 3.5,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,
  },

  {
    id: 5,
    world: 3,
    name: 'Pressure Test',
    instruction:
      'Final pressure challenge. Read the rhythm and react fast.',

    target: 68,
    tolerance: 2,

    fillSpeed: 36,
    flowType: 'variable',

    attempts: 3,
    timeLimit: 3,
    waterReserve: null,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,
  },

  // =====================================================
  // WORLD 4 — CONTROL
  // =====================================================

  {
    id: 1,
    world: 4,
    name: 'Limited Supply',
    instruction:
      'Water is limited. Reach the target without wasting your reserve.',

    target: 65,
    tolerance: 5,

    fillSpeed: 30,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: 180,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,
  },

  {
    id: 2,
    world: 4,
    name: 'Think Before You Pour',
    instruction:
      'Your reserve is smaller. Every drop matters.',

    target: 70,
    tolerance: 4,

    fillSpeed: 32,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: 150,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,
  },

  {
    id: 3,
    world: 4,
    name: 'Momentum',
    instruction:
      'The water keeps flowing after release. Stop early.',

    target: 65,
    tolerance: 4,

    fillSpeed: 30,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0.35,
  },

  {
    id: 4,
    world: 4,
    name: 'Resource Control',
    instruction:
      'Manage your reserve and anticipate the remaining flow.',

    target: 72,
    tolerance: 3,

    fillSpeed: 32,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: 170,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0.4,
  },

  {
    id: 5,
    world: 4,
    name: 'Control Test',
    instruction:
      'Limited water. Strong momentum. Precise control required.',

    target: 68,
    tolerance: 2,

    fillSpeed: 34,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: 155,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0.5,
  },

  // =====================================================
  // WORLD 5 — ENVIRONMENT
  // =====================================================

  {
    id: 1,
    world: 5,
    name: 'Warm Up',
    instruction:
      'Warm water evaporates after release. Aim slightly above the target.',

    target: 65,
    tolerance: 4,

    fillSpeed: 30,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    temperature: 45,
    temperatureMode: 'fixed',
    evaporationRate: 1.5,
    evaporationDuration: 1.2,
  },

  {
    id: 2,
    world: 5,
    name: 'Getting Hot',
    instruction:
      'Hotter water evaporates faster. Anticipate the loss before you release.',

    target: 68,
    tolerance: 4,

    fillSpeed: 31,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    temperature: 70,
    temperatureMode: 'fixed',
    evaporationRate: 3,
    evaporationDuration: 1.4,
  },

  {
    id: 3,
    world: 5,
    name: 'Cooling Down',
    instruction:
      'The water cools over time. Its evaporation rate changes with temperature.',

    target: 62,
    tolerance: 3,

    fillSpeed: 32,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    temperature: 85,
    temperatureMode: 'cooling',
    evaporationRate: 4,
    evaporationDuration: 1.5,
  },

  {
    id: 4,
    world: 5,
    name: 'Heat Control',
    instruction:
      'Manage your limited reserve while accounting for evaporation.',

    target: 70,
    tolerance: 3,

    fillSpeed: 32,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: 170,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    temperature: 78,
    temperatureMode: 'fixed',
    evaporationRate: 3.5,
    evaporationDuration: 1.5,
  },

  {
    id: 5,
    world: 5,
    name: 'Boiling Point',
    instruction:
      'Heat, evaporation and momentum combine. Anticipate every change.',

    target: 68,
    tolerance: 2,

    fillSpeed: 34,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: 165,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0.4,

    temperature: 92,
    temperatureMode: 'fixed',
    evaporationRate: 4.5,
    evaporationDuration: 1.7,
  },
    // =====================================================
  // WORLD 6 — OBSTACLES
  // =====================================================

  {
    id: 1,
    world: 6,
    name: 'First Impact',
    instruction:
      'The obstacle disrupts the flow. Adapt when the water reaches it.',

    target: 70,
    tolerance: 3,

    fillSpeed: 36,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    obstacleMode: 'fixed',
    obstacleStrength: 0.45,
    obstaclePositions: [45],
    obstacleMovementSpeed: 0,
    blindSpotSize: 0,
  },

  {
    id: 2,
    world: 6,
    name: 'Double Trouble',
    instruction:
      'Two barriers disrupt the flow at different heights. Do not trust one rhythm.',

    target: 74,
    tolerance: 3,

    fillSpeed: 38,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    obstacleMode: 'double',
    obstacleStrength: 0.5,
    obstaclePositions: [35, 62],
    obstacleMovementSpeed: 0,
    blindSpotSize: 0,
  },

  {
    id: 3,
    world: 6,
    name: 'Moving Barrier',
    instruction:
      'The barrier moves while you pour. Its effect changes continuously.',

    target: 68,
    tolerance: 2,

    fillSpeed: 39,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    obstacleMode: 'moving',
    obstacleStrength: 0.55,
    obstaclePositions: [52],
    obstacleMovementSpeed: 3,
    blindSpotSize: 0,
  },

  {
    id: 4,
    world: 6,
    name: 'Blind Spot',
    instruction:
      'Part of the glass is hidden. Track the flow and estimate what you cannot see.',

    target: 72,
    tolerance: 2,

    fillSpeed: 40,
    flowType: 'variable',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    obstacleMode: 'blind',
    obstacleStrength: 0.5,
    obstaclePositions: [48],
    obstacleMovementSpeed: 0,
    blindSpotSize: 28,
  },

  {
    id: 5,
    world: 6,
    name: 'Obstacle Course',
    instruction:
      'Moving barriers, hidden information and momentum combine. Stay in control.',

    target: 76,
    tolerance: 1,

    fillSpeed: 42,
    flowType: 'variable',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0.4,

    obstacleMode: 'moving',
    obstacleStrength: 0.6,
    obstaclePositions: [55],
    obstacleMovementSpeed: 4.2,
    blindSpotSize: 32,
  },
]