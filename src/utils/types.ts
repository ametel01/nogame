export interface CostUpgrade {
  metal: { metal: number; crystal: number; energy: number }
  crystal: { metal: number; crystal: number; energy: number }
  deuterium: { metal: number; crystal: number; energy: number }
  solarPlant: { metal: number; crystal: number; energy: number }
}

export interface ResourceLevels {
  metal: number
  crystal: number
  deuterium: number
  solarPlant: number
}

export interface Points {
  metal: number
  crystal: number
  deuterium: number
  energy: number
}

export interface EndTimeCompletion {
  resourceId: number
  timeEnd: number
}
