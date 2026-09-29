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

    // Seconds available once filling begins.
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

]