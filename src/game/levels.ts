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

    // =====================================================
  // WORLD 7 — MOTION
  // =====================================================

  {
    id: 1,
    world: 7,
    name: 'First Move',
    instruction:
      'The container is moving. Follow it and keep control of your timing.',

    target: 70,
    tolerance: 4,

    fillSpeed: 34,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    motionMode: 'horizontal',
    motionAmplitude: 14,
    motionSpeed: 1.8,
  },

  {
    id: 2,
    world: 7,
    name: 'Pendulum',
    instruction:
      'The container now swings and tilts. Track its rhythm before you release.',

    target: 68,
    tolerance: 4,

    fillSpeed: 35,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    motionMode: 'pendulum',
    motionAmplitude: 18,
    motionSpeed: 2.2,
  },

  {
    id: 3,
    world: 7,
    name: 'Unstable Ground',
    instruction:
      'Vertical movement changes your visual reference. Keep your eyes on the target.',

    target: 72,
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

    motionMode: 'vertical',
    motionAmplitude: 20,
    motionSpeed: 2.7,
  },

  {
    id: 4,
    world: 7,
    name: 'Moving Blind',
    instruction:
      'The container moves without numerical feedback. Trust your visual timing.',

    target: 66,
    tolerance: 3,

    fillSpeed: 37,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    motionMode: 'combined',
    motionAmplitude: 22,
    motionSpeed: 3,
  },

  {
    id: 5,
    world: 7,
    name: 'Motion Mastery',
    instruction:
      'Movement and momentum combine. Release early and anticipate where the water will finish.',

    target: 74,
    tolerance: 2,

    fillSpeed: 38,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0.45,

    motionMode: 'combined',
    motionAmplitude: 28,
    motionSpeed: 3.6,
  },

  // =====================================================
  // WORLD 8 — FROG INVASION
  // =====================================================

  {
    id: 1,
    world: 8,
    name: 'Frog Attack',
    instruction:
      'A frog will jump into the glass. Anticipate the sudden water displacement.',

    target: 68,
    tolerance: 4,

    fillSpeed: 34,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    frogMode: 'single',
    frogTriggerTimes: [1.4],
    frogDisplacement: 8,
    frogExitDisplacement: 0,
    frogObstruction: 0,
    frogShakeStrength: 0,
  },

  {
    id: 2,
    world: 8,
    name: 'Double Trouble',
    instruction:
      'Two frogs jump into the glass at different moments. Anticipate both splashes.',

    target: 72,
    tolerance: 4,

    fillSpeed: 35,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    frogMode: 'double',
    frogTriggerTimes: [0.9, 1.7],
    frogDisplacement: 6,
    frogExitDisplacement: 0,
    frogObstruction: 0,
    frogShakeStrength: 0,
  },

  {
    id: 3,
    world: 8,
    name: 'Jump In, Jump Out',
    instruction:
      'The frog jumps into the glass, then escapes. The water rises and falls while you pour.',

    target: 66,
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

    frogMode: 'in-out',
    frogTriggerTimes: [1, 1.8],
    frogDisplacement: 9,
    frogExitDisplacement: 9,
    frogObstruction: 0,
    frogShakeStrength: 0,
  },

  {
    id: 4,
    world: 8,
    name: 'Frog Invasion',
    instruction:
      'Frogs invade the glass and block your view. Track the level through the chaos.',

    target: 74,
    tolerance: 3,

    fillSpeed: 37,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    frogMode: 'invasion',
    frogTriggerTimes: [0.7, 1.2, 1.7],
    frogDisplacement: 4,
    frogExitDisplacement: 0,
    frogObstruction: 45,
    frogShakeStrength: 0,
  },

  {
    id: 5,
    world: 8,
    name: 'Frog Apocalypse',
    instruction:
      'Multiple frogs, hidden information and violent movement combine. Survive the invasion.',

    target: 70,
    tolerance: 2,

    fillSpeed: 38,
    flowType: 'variable',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0.35,

    frogMode: 'apocalypse',
    frogTriggerTimes: [0.6, 1.05, 1.5, 1.95],
    frogDisplacement: 3,
    frogExitDisplacement: 0,
    frogObstruction: 55,
    frogShakeStrength: 12,
  },
  // =====================================================
  // WORLD 9 — CHAOS
  // =====================================================

  {
    id: 1,
    world: 9,
    name: 'Unstable Flow',
    instruction:
      'The flow changes while the glass moves. Track both rhythms and choose your moment.',

    target: 70,
    tolerance: 3,

    fillSpeed: 36,
    flowType: 'variable',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    motionMode: 'horizontal',
    motionAmplitude: 18,
    motionSpeed: 2.2,
  },

  {
    id: 2,
    world: 9,
    name: 'Hot Mess',
    instruction:
      'Heat changes the final level while an obstacle disrupts the flow. Anticipate both effects.',

    target: 68,
    tolerance: 3,

    fillSpeed: 35,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    temperature: 78,
    temperatureMode: 'fixed',
    evaporationRate: 3.5,
    evaporationDuration: 1.4,

    obstacleMode: 'fixed',
    obstacleStrength: 0.45,
    obstaclePositions: [48],
    obstacleMovementSpeed: 0,
    blindSpotSize: 0,
  },

  {
    id: 3,
    world: 9,
    name: 'Frog on the Move',
    instruction:
      'The glass moves while frogs invade it. Adapt to movement and sudden water displacement.',

    target: 72,
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

    motionMode: 'pendulum',
    motionAmplitude: 20,
    motionSpeed: 2.5,

    frogMode: 'double',
    frogTriggerTimes: [0.9, 1.6],
    frogDisplacement: 5,
    frogExitDisplacement: 0,
    frogObstruction: 0,
    frogShakeStrength: 0,
  },

  {
    id: 4,
    world: 9,
    name: 'Limited Chaos',
    instruction:
      'Your reserve is limited and part of the glass is hidden. Control every drop through the disruption.',

    target: 70,
    tolerance: 2,

    fillSpeed: 38,
    flowType: 'variable',

    attempts: 3,
    timeLimit: null,
    waterReserve: 155,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0.3,

    obstacleMode: 'blind',
    obstacleStrength: 0.5,
    obstaclePositions: [50],
    obstacleMovementSpeed: 0,
    blindSpotSize: 30,
  },

  {
    id: 5,
    world: 9,
    name: 'Total Chaos',
    instruction:
      'Movement, unstable flow, momentum and frogs collide. Master the chaos without numerical feedback.',

    target: 74,
    tolerance: 2,

    fillSpeed: 39,
    flowType: 'variable',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0.4,

    motionMode: 'combined',
    motionAmplitude: 24,
    motionSpeed: 3.1,

    frogMode: 'invasion',
    frogTriggerTimes: [0.7, 1.25, 1.8],
    frogDisplacement: 3,
    frogExitDisplacement: 0,
    frogObstruction: 35,
    frogShakeStrength: 0,
  },

    // =====================================================
  // WORLD 10 — MASTERY
  // =====================================================

  {
    id: 1,
    world: 10,
    name: 'Precision Under Pressure',
    instruction:
      'The clock is running and the flow accelerates. Stay calm and release with precision.',

    target: 70,
    tolerance: 2,

    fillSpeed: 31,
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
    id: 2,
    world: 10,
    name: 'Resource Mastery',
    instruction:
      'Limited water, momentum and evaporation combine. Plan where the level will finally settle.',

    target: 68,
    tolerance: 2,

    fillSpeed: 33,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: 155,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0.35,

    temperature: 82,
    temperatureMode: 'fixed',
    evaporationRate: 3.5,
    evaporationDuration: 1.4,
  },

  {
    id: 3,
    world: 10,
    name: 'Moving Hazard',
    instruction:
      'A moving barrier disrupts a changing flow while the container moves. Read the entire system.',

    target: 72,
    tolerance: 2,

    fillSpeed: 36,
    flowType: 'variable',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    obstacleMode: 'moving',
    obstacleStrength: 0.5,
    obstaclePositions: [52],
    obstacleMovementSpeed: 3.4,
    blindSpotSize: 0,

    motionMode: 'horizontal',
    motionAmplitude: 20,
    motionSpeed: 2.5,
  },

  {
    id: 4,
    world: 10,
    name: 'Blind Mastery',
    instruction:
      'Numbers are gone. Follow the moving glass and anticipate the frogs by sight and timing alone.',

    target: 70,
    tolerance: 2,

    fillSpeed: 36,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0.25,

    motionMode: 'pendulum',
    motionAmplitude: 20,
    motionSpeed: 2.6,

    frogMode: 'in-out',
    frogTriggerTimes: [0.9, 1.65],
    frogDisplacement: 8,
    frogExitDisplacement: 8,
    frogObstruction: 0,
    frogShakeStrength: 0,
  },

  {
    id: 5,
    world: 10,
    name: 'Final Examination',
    instruction:
      'Everything you learned matters now. Control the flow, conserve water and survive every disruption.',

    target: 72,
    tolerance: 2,

    fillSpeed: 37,
    flowType: 'variable',

    attempts: 3,
    timeLimit: 4,
    waterReserve: 165,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0.35,

    obstacleMode: 'moving',
    obstacleStrength: 0.45,
    obstaclePositions: [50],
    obstacleMovementSpeed: 3,
    blindSpotSize: 18,

    motionMode: 'combined',
    motionAmplitude: 20,
    motionSpeed: 2.8,

    frogMode: 'double',
    frogTriggerTimes: [0.85, 1.55],
    frogDisplacement: 4,
    frogExitDisplacement: 0,
    frogObstruction: 0,
    frogShakeStrength: 0,
  },
   // =====================================================
  // WORLD 11 — WARRIORS
  // =====================================================

  {
    id: 1,
    world: 11,
    name: 'Incoming!',
    instruction:
      'A warrior crosses your field of vision. Keep filling and release at the right moment.',

    target: 70,
    tolerance: 3,

    fillSpeed: 34,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    warriorMode: 'crossing',
    warriorTriggerTimes: [0.8],
    warriorPushStrength: 0,
    warriorHideDuration: 0,
    warriorObstruction: 38,
  },

  {
    id: 2,
    world: 11,
    name: 'Glass Push',
    instruction:
      'The warrior can suddenly push the glass. Keep control when your reference point moves.',

    target: 68,
    tolerance: 3,

    fillSpeed: 35,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    warriorMode: 'push',
    warriorTriggerTimes: [0.85, 1.55],
    warriorPushStrength: 28,
    warriorHideDuration: 0,
    warriorObstruction: 0,
  },

  {
    id: 3,
    world: 11,
    name: 'Thief!',
    instruction:
      'The warrior steals the glass, but the water keeps flowing. Decide when to release without seeing it.',

    target: 72,
    tolerance: 3,

    fillSpeed: 35,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    warriorMode: 'steal',
    warriorTriggerTimes: [0.9],
    warriorPushStrength: 0,
    warriorHideDuration: 1.15,
    warriorObstruction: 0,
  },

  {
    id: 4,
    world: 11,
    name: "Can't See!",
    instruction:
      'A warrior blocks the critical part of the glass. Estimate the level from the information you saw before.',

    target: 70,
    tolerance: 2,

    fillSpeed: 36,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0.2,

    warriorMode: 'obstruction',
    warriorTriggerTimes: [0.8],
    warriorPushStrength: 0,
    warriorHideDuration: 1.5,
    warriorObstruction: 58,
  },

  {
  id: 5,
  world: 11,
  name: 'War Zone',
  instruction:
    'Crossing, pushing, stealing and obstruction arrive in sequence. Stay calm and adapt to each attack.',

  target: 72,
  tolerance: 3,

  fillSpeed: 34,
  flowType: 'constant',

  attempts: 3,
  timeLimit: null,
  waterReserve: null,

  showPercentage: false,
  showTargetZone: true,

  containerShape: 'straight',

  inertia: 0.15,

  warriorMode: 'war-zone',
  warriorTriggerTimes: [
    0.65,
    1.25,
    1.85,
    2.45,
  ],

  warriorPushStrength: 20,
  warriorHideDuration: 0.45,
  warriorObstruction: 38,
},

  // =====================================================
  // WORLD 12 — SURVIVORS
  // =====================================================

  {
    id: 1,
    world: 12,
    name: 'Aftershock',
    instruction:
      'Sudden aftershocks shake the glass. Keep your timing steady when your visual reference starts moving.',

    target: 70,
    tolerance: 4,

    fillSpeed: 34,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: true,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    survivorMode: 'aftershock',
    survivorTriggerTimes: [
      0.85,
      1.65,
    ],
    survivorShakeStrength: 12,
    survivorHideDuration: 0,
    survivorObstruction: 0,
  },

    {
    id: 2,
    world: 12,
    name: 'Pressure',
    instruction:
      'Pressure surges accelerate the flow while frogs and warriors invade the scene. Keep control through the panic.',

    target: 70,
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

    // SURVIVORS — strong pressure bursts
    survivorMode: 'pressure',
    survivorTriggerTimes: [
      0.65,
      1.45,
    ],
    survivorShakeStrength: 0,
    survivorHideDuration: 0,
    survivorObstruction: 0.85,

    // FROGS — water displacement
    frogMode: 'double',
    frogTriggerTimes: [
      0.9,
      1.65,
    ],
    frogDisplacement: 4,
    frogExitDisplacement: 0,
    frogObstruction: 0,
    frogShakeStrength: 0,

    // WARRIORS — visual interference
    warriorMode: 'crossing',
    warriorTriggerTimes: [
      0.75,
      1.55,
    ],
    warriorPushStrength: 0,
    warriorHideDuration: 0,
    warriorObstruction: 28,
  },

  {
    id: 3,
    world: 12,
    name: 'Blackout',
    instruction:
      'The lights fail while the water keeps flowing. Remember what you saw and decide when to release in the dark.',

    target: 72,
    tolerance: 3,

    fillSpeed: 33,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0,

    survivorMode: 'blackout',
    survivorTriggerTimes: [
      0.9,
      1.8,
    ],
    survivorShakeStrength: 0,
    survivorHideDuration: 0.75,
    survivorObstruction: 0,
  },

  {
    id: 4,
    world: 12,
    name: 'Critical Condition',
    instruction:
      'Aftershocks, pressure surges and blackouts strike in sequence. Identify each threat and adapt your timing.',

    target: 70,
    tolerance: 3,

    fillSpeed: 32,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0.1,

    survivorMode: 'critical',
    survivorTriggerTimes: [
      0.65,
      1.35,
      2.05,
    ],
    survivorShakeStrength: 10,
    survivorHideDuration: 0.65,
    survivorObstruction: 0.35,
  },

  {
    id: 5,
    world: 12,
    name: 'Survivor',
    instruction:
      'Everything is unstable. Survive the shocks, pressure and darkness, then release at the only moment that matters.',

    target: 72,
    tolerance: 3,

    fillSpeed: 33,
    flowType: 'constant',

    attempts: 3,
    timeLimit: null,
    waterReserve: null,

    showPercentage: false,
    showTargetZone: true,

    containerShape: 'straight',

    inertia: 0.15,

    survivorMode: 'survival',
    survivorTriggerTimes: [
      0.55,
      1.15,
      1.75,
      2.35,
    ],
    survivorShakeStrength: 12,
    survivorHideDuration: 0.6,
    survivorObstruction: 0.4,
  },
]