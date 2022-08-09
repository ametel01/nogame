import { FC, useEffect, useMemo } from 'react'
import { RowCentered } from '~/components/Row'
import { ResourcesTabList, ResourcesTabs, ResourceTab } from './styleds'
import { ResourcesIcon } from '~/components/Icons/Resources'
import { FacilitiesIcon } from '~/components/Icons/Facilities'
import { ResearchIcon } from '~/components/Icons/Research'
import { ShipyardIcon } from '~/components/Icons/Shipyard'
import { ResourceTabPanel } from './ResourceTabPanel'
import { FacilitiesTabPanel } from './FacilitiesTabPanel'
import { useStarknet, useStarknetCall } from '@starknet-react/core'
import { useGameContract } from '~/hooks/game'
import { differenceInMinutes, fromUnixTime } from 'date-fns'
import { dataToNumber } from '~/utils'
import { ResearchTabPanel } from '~/components/ResourcesSection/LabTabPanel'
import { ShipyardTabPanel } from '~/components/ResourcesSection/ShipyardTabPanel'
import { EmptyTabPanel } from './EmptyTabPanel'

export const ResourcesSection: FC = () => {
  const { account } = useStarknet()
  const { contract: gameContract } = useGameContract()

  const { data: resourcesAvailable } = useStarknetCall({
    contract: gameContract,
    method: 'getResourcesAvailable',
    args: [account],
  })

  const { data: timeCompletion } = useStarknetCall({
    contract: gameContract,
    method: 'getBuildingQueStatus',
    args: [account],
  })

  const { data: resourcesUpgradesCost } = useStarknetCall({
    contract: gameContract,
    method: 'getResourcesUpgradeCost',
    args: [account],
  })

  const { data: buildingsLevels } = useStarknetCall({
    contract: gameContract,
    method: 'getResourcesBuildingsLevels',
    args: [account],
  })

  const { data: facilitiesUpgradesCost } = useStarknetCall({
    contract: gameContract,
    method: 'getFacilitiesUpgradeCost',
    args: [account],
  })

  const { data: structuresLevels } = useStarknetCall({
    contract: gameContract,
    method: 'getFacilitiesLevels',
    args: [account],
  })

  const { data: shipsLevels } = useStarknetCall({
    contract: gameContract,
    method: 'getFleetLevels',
    args: [account],
  })

  const { data: shipsCost } = useStarknetCall({
    contract: gameContract,
    method: 'getShipsCost',
    args: [],
  })

  const { data: techUpgradesCost } = useStarknetCall({
    contract: gameContract,
    method: 'getTechUpgradeCost{',
    args: [account],
  })

  const { data: technologiesLevels } = useStarknetCall({
    contract: gameContract,
    method: 'getTechLevels',
    args: [account],
  })

  const endTimeCompletion = useMemo(() => {
    if (timeCompletion) {
      const end = fromUnixTime(dataToNumber(timeCompletion['time_end']))
      const timeDifferenceInMinutes = differenceInMinutes(end, new Date())
      // console.log(end, timeDifferenceInMinutes)

      return {
        resourceId: dataToNumber(timeCompletion['building_id']),
        timeEnd: timeDifferenceInMinutes > 0 ? timeDifferenceInMinutes : 0,
      }
    }
  }, [timeCompletion])

  const playerResources = useMemo(() => {
    if (resourcesAvailable) {
      return {
        metal: dataToNumber(resourcesAvailable['metal_available']),
        crystal: dataToNumber(resourcesAvailable['crystal_available']),
        deuterium: dataToNumber(resourcesAvailable['deuterium_available']),
        energy: dataToNumber(resourcesAvailable['energy_available']),
      }
    }
  }, [resourcesAvailable])

  const resourceLevels = useMemo(() => {
    if (buildingsLevels) {
      return {
        metal: dataToNumber(buildingsLevels['metal_mine']),
        crystal: dataToNumber(buildingsLevels['crystal_mine']),
        deuterium: dataToNumber(buildingsLevels['deuterium_mine']),
        solarPlant: dataToNumber(buildingsLevels['solar_plant']),
      }
    }
  }, [buildingsLevels])

  const resourceCostUpgrade = useMemo(() => {
    if (resourcesUpgradesCost) {
      return {
        metal: {
          metal: dataToNumber(resourcesUpgradesCost['metal_mine'].metal),
          crystal: dataToNumber(resourcesUpgradesCost['metal_mine'].crystal),
          deuterium: dataToNumber(resourcesUpgradesCost['metal_mine'].deuterium),
          energy: dataToNumber(resourcesUpgradesCost['metal_mine'].energy_cost),
        },
        crystal: {
          metal: dataToNumber(resourcesUpgradesCost['crystal_mine'].metal),
          crystal: dataToNumber(resourcesUpgradesCost['crystal_mine'].crystal),
          deuterium: dataToNumber(resourcesUpgradesCost['crystal_mine'].deuterium),
          energy: dataToNumber(resourcesUpgradesCost['crystal_mine'].energy_cost),
        },
        deuterium: {
          metal: dataToNumber(resourcesUpgradesCost['deuterium_mine'].metal),
          crystal: dataToNumber(resourcesUpgradesCost['deuterium_mine'].crystal),
          deuterium: dataToNumber(resourcesUpgradesCost['deuterium_mine'].deuterium),
          energy: dataToNumber(resourcesUpgradesCost['deuterium_mine'].energy_cost),
        },
        solarPlant: {
          metal: dataToNumber(resourcesUpgradesCost['solar_plant'].metal),
          crystal: dataToNumber(resourcesUpgradesCost['solar_plant'].crystal),
          deuterium: dataToNumber(resourcesUpgradesCost['solar_plant'].deuterium),
          energy: dataToNumber(resourcesUpgradesCost['solar_plant'].energy_cost),
        },
      }
    }
  }, [resourcesUpgradesCost])

  const facilitiesLevels = useMemo(() => {
    if (structuresLevels) {
      return {
        robots: dataToNumber(structuresLevels['robot_factory']),
        shipyard: dataToNumber(structuresLevels['shipyard']),
        lab: dataToNumber(structuresLevels['research_lab']),
        nanite: dataToNumber(structuresLevels['nanite_factory']),
      }
    }
  }, [structuresLevels])

  const facilitiesCostUpgrade = useMemo(() => {
    if (facilitiesUpgradesCost) {
      return {
        robots: {
          metal: dataToNumber(facilitiesUpgradesCost['robot_factory'].metal),
          crystal: dataToNumber(facilitiesUpgradesCost['robot_factory'].crystal),
          deuterium: dataToNumber(facilitiesUpgradesCost['robot_factory'].deuterium),
          energy: dataToNumber(facilitiesUpgradesCost['robot_factory'].energy_cost),
        },
        shipyard: {
          metal: dataToNumber(facilitiesUpgradesCost['shipyard'].metal),
          crystal: dataToNumber(facilitiesUpgradesCost['shipyard'].crystal),
          deuterium: dataToNumber(facilitiesUpgradesCost['shipyard'].deuterium),
          energy: dataToNumber(facilitiesUpgradesCost['shipyard'].energy_cost),
        },
        lab: {
          metal: dataToNumber(facilitiesUpgradesCost['research_lab'].metal),
          crystal: dataToNumber(facilitiesUpgradesCost['research_lab'].crystal),
          deuterium: dataToNumber(facilitiesUpgradesCost['research_lab'].deuterium),
          energy: dataToNumber(facilitiesUpgradesCost['research_lab'].energy_cost),
        },
        nanite: {
          metal: dataToNumber(facilitiesUpgradesCost['nanite_factory'].metal),
          crystal: dataToNumber(facilitiesUpgradesCost['nanite_factory'].crystal),
          deuterium: dataToNumber(facilitiesUpgradesCost['nanite_factory'].deuterium),
          energy: dataToNumber(facilitiesUpgradesCost['nanite_factory'].energy_cost),
        },
      }
    }
  }, [facilitiesUpgradesCost])

  const fleetLevels = useMemo(() => {
    if (shipsLevels) {
      return {
        cargo: dataToNumber(shipsLevels['cargo']),
        recycler: dataToNumber(shipsLevels['recycler']),
        probe: dataToNumber(shipsLevels['espionage_probe']),
        satellite: dataToNumber(shipsLevels['solar_satellite']),
        fighter: dataToNumber(shipsLevels['light_fighter']),
        cruiser: dataToNumber(shipsLevels['cruiser']),
        battleship: dataToNumber(shipsLevels['battleship']),
      }
    }
  }, [shipsLevels])

  const fleetCost = useMemo(() => {
    if (shipsCost) {
      return {
        cargo: {
          metal: dataToNumber(shipsCost['cargo'].metal),
          crystal: dataToNumber(shipsCost['cargo'].crystal),
          deuterium: dataToNumber(shipsCost['cargo'].deuterium),
          energy: dataToNumber(shipsCost['cargo'].energy_cost),
        },
        recycler: {
          metal: dataToNumber(shipsCost['recycler'].metal),
          crystal: dataToNumber(shipsCost['recycler'].crystal),
          deuterium: dataToNumber(shipsCost['recycler'].deuterium),
          energy: dataToNumber(shipsCost['recycler'].energy_cost),
        },
        probe: {
          metal: dataToNumber(shipsCost['espionage_probe'].metal),
          crystal: dataToNumber(shipsCost['espionage_probe'].crystal),
          deuterium: dataToNumber(shipsCost['espionage_probe'].deuterium),
          energy: dataToNumber(shipsCost['espionage_probe'].energy_cost),
        },
        satellite: {
          metal: dataToNumber(shipsCost['solar_satellite'].metal),
          crystal: dataToNumber(shipsCost['solar_satellite'].crystal),
          deuterium: dataToNumber(shipsCost['solar_satellite'].deuterium),
          energy: dataToNumber(shipsCost['solar_satellite'].energy_cost),
        },
        fighter: {
          metal: dataToNumber(shipsCost['light_fighter'].metal),
          crystal: dataToNumber(shipsCost['light_fighter'].crystal),
          deuterium: dataToNumber(shipsCost['light_fighter'].deuterium),
          energy: dataToNumber(shipsCost['light_fighter'].energy_cost),
        },
        cruiser: {
          metal: dataToNumber(shipsCost['cruiser'].metal),
          crystal: dataToNumber(shipsCost['cruiser'].crystal),
          deuterium: dataToNumber(shipsCost['cruiser'].deuterium),
          energy: dataToNumber(shipsCost['cruiser'].ergy_cost),
        },
        battleship: {
          metal: dataToNumber(shipsCost['battleship'].metal),
          crystal: dataToNumber(shipsCost['battleship'].crystal),
          deuterium: dataToNumber(shipsCost['battleship'].deuterium),
          energy: dataToNumber(shipsCost['battleship'].energy_cost),
        },
      }
    }
  }, [shipsCost])

  const techLevels = useMemo(() => {
    if (technologiesLevels) {
      return {
        armour: dataToNumber(technologiesLevels['armour_tech']),
        astrophysics: dataToNumber(technologiesLevels['astrophysics']),
        combustion: dataToNumber(technologiesLevels['combustion_drive']),
        computer: dataToNumber(technologiesLevels['computer_tech']),
        energy: dataToNumber(technologiesLevels['energy_tech']),
        espionage: dataToNumber(technologiesLevels['espionage_tech']),
        hyperspaceDrive: dataToNumber(technologiesLevels['hyperspace_drive']),
        hyperspaceTech: dataToNumber(technologiesLevels['hyperspace_tech']),
        impulse: dataToNumber(technologiesLevels['impulse_drive']),
        ion: dataToNumber(technologiesLevels['ion_tech']),
        laser: dataToNumber(technologiesLevels['laser_tech']),
        plasma: dataToNumber(technologiesLevels['plasma_tech']),
        shielding: dataToNumber(technologiesLevels['shielding_tech']),
        weapons: dataToNumber(technologiesLevels['weapons_tech']),
      }
    }
  }, [technologiesLevels])

  const techCostUpgrade = useMemo(() => {
    if (techUpgradesCost) {
      return {
        armour: {
          metal: dataToNumber(techUpgradesCost['armour_tech'].metal),
          crystal: dataToNumber(techUpgradesCost['armour_tech'].crystal),
          deuterium: dataToNumber(techUpgradesCost['armour_tech'].deuterium),
          energy: dataToNumber(techUpgradesCost['armour_tech'].energy_cost),
        },
        astrophysics: {
          metal: dataToNumber(techUpgradesCost['astrophysics'].metal),
          crystal: dataToNumber(techUpgradesCost['astrophysics'].crystal),
          deuterium: dataToNumber(techUpgradesCost['astrophysics'].deuterium),
          energy: dataToNumber(techUpgradesCost['astrophysics'].energy_cost),
        },
        combustion: {
          metal: dataToNumber(techUpgradesCost['combustion_drive'].metal),
          crystal: dataToNumber(techUpgradesCost['combustion_drive'].crystal),
          deuterium: dataToNumber(techUpgradesCost['combustion_drive'].deuterium),
          energy: dataToNumber(techUpgradesCost['combustion_drive'].energy_cost),
        },
        computer: {
          metal: dataToNumber(techUpgradesCost['computer_tech'].metal),
          crystal: dataToNumber(techUpgradesCost['computer_tech'].crystal),
          deuterium: dataToNumber(techUpgradesCost['computer_tech'].deuterium),
          energy: dataToNumber(techUpgradesCost['computer_tech'].energy_cost),
        },
        energy: {
          metal: dataToNumber(techUpgradesCost['energy_tech'].metal),
          crystal: dataToNumber(techUpgradesCost['energy_tech'].crystal),
          deuterium: dataToNumber(techUpgradesCost['energy_tech'].deuterium),
          energy: dataToNumber(techUpgradesCost['energy_tech'].energy_cost),
        },
        espionage: {
          metal: dataToNumber(techUpgradesCost['espionage_tech'].metal),
          crystal: dataToNumber(techUpgradesCost['espionage_tech'].crystal),
          deuterium: dataToNumber(techUpgradesCost['espionage_tech'].deuterium),
          energy: dataToNumber(techUpgradesCost['espionage_tech'].energy_cost),
        },
        hyperspaceDrive: {
          metal: dataToNumber(techUpgradesCost['hyperspace_drive'].metal),
          crystal: dataToNumber(techUpgradesCost['hyperspace_drive'].crystal),
          deuterium: dataToNumber(techUpgradesCost['hyperspace_drive'].deuterium),
          energy: dataToNumber(techUpgradesCost['hyperspace_drive'].energy_cost),
        },
        hyperspaceTech: {
          metal: dataToNumber(techUpgradesCost['hyperspace_tech'].metal),
          crystal: dataToNumber(techUpgradesCost['hyperspace_tech'].crystal),
          deuterium: dataToNumber(techUpgradesCost['hyperspace_tech'].deuterium),
          energy: dataToNumber(techUpgradesCost['hyperspace_tech'].energy_cost),
        },
        impulse: {
          metal: dataToNumber(techUpgradesCost['impulse_drive'].metal),
          crystal: dataToNumber(techUpgradesCost['impulse_drive'].crystal),
          deuterium: dataToNumber(techUpgradesCost['impulse_drive'].deuterium),
          energy: dataToNumber(techUpgradesCost['impulse_drive'].energy_cost),
        },
        ion: {
          metal: dataToNumber(techUpgradesCost['ion_tech'].metal),
          crystal: dataToNumber(techUpgradesCost['ion_tech'].crystal),
          deuterium: dataToNumber(techUpgradesCost['ion_tech'].deuterium),
          energy: dataToNumber(techUpgradesCost['ion_tech'].energy_cost),
        },
        laser: {
          metal: dataToNumber(techUpgradesCost['laser_tech'].metal),
          crystal: dataToNumber(techUpgradesCost['laser_tech'].crystal),
          deuterium: dataToNumber(techUpgradesCost['laser_tech'].deuterium),
          energy: dataToNumber(techUpgradesCost['laser_tech'].energy_cost),
        },
        plasma: {
          metal: dataToNumber(techUpgradesCost['plasma_tech'].metal),
          crystal: dataToNumber(techUpgradesCost['plasma_tech'].crystal),
          deuterium: dataToNumber(techUpgradesCost['plasma_tech'].deuterium),
          energy: dataToNumber(techUpgradesCost['plasma_tech'].energy_cost),
        },
        shielding: {
          metal: dataToNumber(techUpgradesCost['shielding_tech'].metal),
          crystal: dataToNumber(techUpgradesCost['shielding_tech'].crystal),
          deuterium: dataToNumber(techUpgradesCost['shielding_tech'].deuterium),
          energy: dataToNumber(techUpgradesCost['shielding_tech'].energy_cost),
        },
        weapons: {
          metal: dataToNumber(techUpgradesCost['weapons_tech'].metal),
          crystal: dataToNumber(techUpgradesCost['weapons_tech'].crystal),
          deuterium: dataToNumber(techUpgradesCost['weapons_tech'].deuterium),
          energy: dataToNumber(techUpgradesCost['weapons_tech'].energy_cost),
        },
      }
    }
  }, [techUpgradesCost])

  return (
    <ResourcesTabs>
      <ResourcesTabList>
        <ResourceTab>
          <RowCentered gap={'8px'}>
            <ResourcesIcon /> Resources
          </RowCentered>
        </ResourceTab>
        <ResourceTab>
          <RowCentered gap={'8px'}>
            <FacilitiesIcon /> Facilites
          </RowCentered>
        </ResourceTab>
        <ResourceTab>
          <RowCentered gap={'8px'}>
            <ResearchIcon /> Shipyard
          </RowCentered>
        </ResourceTab>
        <ResourceTab>
          <RowCentered gap={'8px'}>
            <ShipyardIcon /> Research
          </RowCentered>
        </ResourceTab>
        <ResourceTab>
          <RowCentered gap={'8px'}>
            <ResourcesIcon />
            Fleet Movement
          </RowCentered>
        </ResourceTab>
      </ResourcesTabList>

      <ResourceTabPanel
        endTimeCompletion={endTimeCompletion}
        playerResources={playerResources}
        resourceLevels={resourceLevels}
        ResourcesCostUpgrade={resourceCostUpgrade}
      />
      <FacilitiesTabPanel
        endTimeCompletion={endTimeCompletion}
        playerResources={playerResources}
        facilitiesLevels={facilitiesLevels}
        FacilitiesCostUpgrade={facilitiesCostUpgrade}
      />
      <ShipyardTabPanel
        endTimeCompletion={endTimeCompletion}
        playerResources={playerResources}
        fleetLevels={fleetLevels}
        FleetCost={fleetCost}
      />
      <ResearchTabPanel
        endTimeCompletion={endTimeCompletion}
        playerResources={playerResources}
        techLevels={techLevels}
        TechCostUpgrade={techCostUpgrade}
      />
      <EmptyTabPanel />
    </ResourcesTabs>
  )
}
