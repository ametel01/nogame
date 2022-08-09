export interface ResourcesCostUpgrade {
  metal: { metal: number; crystal: number; deuterium: number; energy: number }
  crystal: { metal: number; crystal: number; deuterium: number; energy: number }
  deuterium: { metal: number; crystal: number; deuterium: number; energy: number }
  solarPlant: { metal: number; crystal: number; deuterium: number; energy: number }
}

export interface ResourceLevels {
  metal: number
  crystal: number
  deuterium: number
  solarPlant: number
}

export interface FacilitiesCostUpgrade {
  robots: { metal: number; crystal: number; deuterium: number; energy: number }
  shipyard: { metal: number; crystal: number; deuterium: number; energy: number }
  lab: { metal: number; crystal: number; deuterium: number; energy: number }
  nanite: { metal: number; crystal: number; deuterium: number; energy: number }
}

export interface FacilitiesLevels {
  robots: number
  shipyard: number
  lab: number
  nanite: number
}

export interface FleetLevels {
  cargo: number
  recycler: number
  probe: number
  satellite: number
  fighter: number
  cruiser: number
  battleship: number
}

export interface FleetCost {
  cargo: { metal: number; crystal: number; deuterium: number; energy: number }
  recycler: { metal: number; crystal: number; deuterium: number; energy: number }
  probe: { metal: number; crystal: number; deuterium: number; energy: number }
  satellite: { metal: number; crystal: number; deuterium: number; energy: number }
  fighter: { metal: number; crystal: number; deuterium: number; energy: number }
  cruiser: { metal: number; crystal: number; deuterium: number; energy: number }
  battleship: { metal: number; crystal: number; deuterium: number; energy: number }
}

export interface TechCostUpgrade {
  armour: { metal: number; crystal: number; deuterium: number; energy: number }
  astrophysics: { metal: number; crystal: number; deuterium: number; energy: number }
  combustion: { metal: number; crystal: number; deuterium: number; energy: number }
  computer: { metal: number; crystal: number; deuterium: number; energy: number }
  energy: { metal: number; crystal: number; deuterium: number; energy: number }
  espionage: { metal: number; crystal: number; deuterium: number; energy: number }
  hyperspaceDrive: { metal: number; crystal: number; deuterium: number; energy: number }
  hyperspaceTech: { metal: number; crystal: number; deuterium: number; energy: number }
  impulse: { metal: number; crystal: number; deuterium: number; energy: number }
  ion: { metal: number; crystal: number; deuterium: number; energy: number }
  laser: { metal: number; crystal: number; deuterium: number; energy: number }
  plasma: { metal: number; crystal: number; deuterium: number; energy: number }
  shielding: { metal: number; crystal: number; deuterium: number; energy: number }
  weapons: { metal: number; crystal: number; deuterium: number; energy: number }
}

export interface TechLevels {
  armour: number
  astrophysics: number
  combustion: number
  computer: number
  energy: number
  espionage: number
  hyperspaceDrive: number
  hyperspaceTech: number
  impulse: number
  ion: number
  laser: number
  plasma: number
  shielding: number
  weapons: number
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
