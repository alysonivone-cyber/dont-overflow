import type { LevelConfig } from './types'

export const levels: LevelConfig[] = [
  {
    id: 1,
    world: 1,
    name: 'First Fill',
    instruction: 'Hold to fill. Release inside the target zone.',

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
    instruction: 'The target is narrower. Stop between 61% and 69%.',

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
    instruction: 'The target has moved lower. Stop between 42% and 48%.',

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
    instruction: 'The water flows faster. React quickly and hit the target.',

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
    instruction: 'Final calibration test. Stop between 56% and 60%.',

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
]