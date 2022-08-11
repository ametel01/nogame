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
import { dataToNumber, E18ToNumber, numberWithCommas } from '~/utils'
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
    method: 'getTechUpgradeCost',
    args: [account],
  })

  const { data: technologiesLevels } = useStarknetCall({
    contract: gameContract,
    method: 'getTechLevels',
    args: [account],
  })

  const endTimeCompletion = useMemo(() => {
    if (timeCompletion) {
      const end = fromUnixTime(dataToNumber(timeCompletion['status'].lock_end))
      const timeDifferenceInMinutes = differenceInMinutes(end, new Date())

      return {
        resourceId: dataToNumber(timeCompletion['status'].building_id),
        timeEnd: timeDifferenceInMinutes > 0 ? timeDifferenceInMinutes : 0,
      }
    }
  }, [timeCompletion])

  const playerResources = useMemo(() => {
    if (resourcesAvailable) {
      return {
        metal: E18ToNumber(resourcesAvailable['metal']),
        crystal: E18ToNumber(resourcesAvailable['crystal']),
        deuterium: E18ToNumber(resourcesAvailable['deuterium']),
        energy: E18ToNumber(resourcesAvailable['energy']),
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
          metal: numberWithCommas(dataToNumber(resourcesUpgradesCost['metal_mine'].metal)),
          crystal: numberWithCommas(dataToNumber(resourcesUpgradesCost['metal_mine'].crystal)),
          deuterium: numberWithCommas(dataToNumber(resourcesUpgradesCost['metal_mine'].deuterium)),
          energy: numberWithCommas(dataToNumber(resourcesUpgradesCost['metal_mine'].energy_cost)),
        },
        crystal: {
          metal: numberWithCommas(dataToNumber(resourcesUpgradesCost['crystal_mine'].metal)),
          crystal: numberWithCommas(dataToNumber(resourcesUpgradesCost['crystal_mine'].crystal)),
          deuterium: numberWithCommas(dataToNumber(resourcesUpgradesCost['crystal_mine'].deuterium)),
          energy: numberWithCommas(dataToNumber(resourcesUpgradesCost['crystal_mine'].energy_cost)),
        },
        deuterium: {
          metal: numberWithCommas(dataToNumber(resourcesUpgradesCost['deuterium_mine'].metal)),
          crystal: numberWithCommas(dataToNumber(resourcesUpgradesCost['deuterium_mine'].crystal)),
          deuterium: numberWithCommas(dataToNumber(resourcesUpgradesCost['deuterium_mine'].deuterium)),
          energy: numberWithCommas(dataToNumber(resourcesUpgradesCost['deuterium_mine'].energy_cost)),
        },
        solarPlant: {
          metal: numberWithCommas(dataToNumber(resourcesUpgradesCost['solar_plant'].metal)),
          crystal: numberWithCommas(dataToNumber(resourcesUpgradesCost['solar_plant'].crystal)),
          deuterium: numberWithCommas(dataToNumber(resourcesUpgradesCost['solar_plant'].deuterium)),
          energy: numberWithCommas(dataToNumber(resourcesUpgradesCost['solar_plant'].energy_cost)),
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
          metal: numberWithCommas(dataToNumber(facilitiesUpgradesCost['robot_factory'].metal)),
          crystal: numberWithCommas(dataToNumber(facilitiesUpgradesCost['robot_factory'].crystal)),
          deuterium: numberWithCommas(dataToNumber(facilitiesUpgradesCost['robot_factory'].deuterium)),
        },
        shipyard: {
          metal: numberWithCommas(dataToNumber(facilitiesUpgradesCost['shipyard'].metal)),
          crystal: numberWithCommas(dataToNumber(facilitiesUpgradesCost['shipyard'].crystal)),
          deuterium: numberWithCommas(dataToNumber(facilitiesUpgradesCost['shipyard'].deuterium)),
        },
        lab: {
          metal: numberWithCommas(dataToNumber(facilitiesUpgradesCost['research_lab'].metal)),
          crystal: numberWithCommas(dataToNumber(facilitiesUpgradesCost['research_lab'].crystal)),
          deuterium: numberWithCommas(dataToNumber(facilitiesUpgradesCost['research_lab'].deuterium)),
        },
        nanite: {
          metal: numberWithCommas(dataToNumber(facilitiesUpgradesCost['nanite_factory'].metal)),
          crystal: numberWithCommas(dataToNumber(facilitiesUpgradesCost['nanite_factory'].crystal)),
          deuterium: numberWithCommas(dataToNumber(facilitiesUpgradesCost['nanite_factory'].deuterium)),
        },
      }
    }
  }, [facilitiesUpgradesCost])

  const fleetLevels = useMemo(() => {
    if (shipsLevels) {
      return {
        cargo: dataToNumber(shipsLevels['result'].cargo),
        recycler: dataToNumber(shipsLevels['result'].recycler),
        probe: dataToNumber(shipsLevels['result'].espionage_probe),
        satellite: dataToNumber(shipsLevels['result'].solar_satellite),
        fighter: dataToNumber(shipsLevels['result'].light_fighter),
        cruiser: dataToNumber(shipsLevels['result'].cruiser),
        battleship: dataToNumber(shipsLevels['result'].battle_ship),
      }
    }
  }, [shipsLevels])

  const fleetCost = useMemo(() => {
    if (shipsCost) {
      return {
        cargo: {
          metal: numberWithCommas(dataToNumber(shipsCost['cargo'].metal)),
          crystal: numberWithCommas(dataToNumber(shipsCost['cargo'].crystal)),
          deuterium: numberWithCommas(dataToNumber(shipsCost['cargo'].deuterium)),
        },
        recycler: {
          metal: numberWithCommas(dataToNumber(shipsCost['recycler'].metal)),
          crystal: numberWithCommas(dataToNumber(shipsCost['recycler'].crystal)),
          deuterium: numberWithCommas(dataToNumber(shipsCost['recycler'].deuterium)),
        },
        probe: {
          metal: numberWithCommas(dataToNumber(shipsCost['espionage_probe'].metal)),
          crystal: numberWithCommas(dataToNumber(shipsCost['espionage_probe'].crystal)),
          deuterium: numberWithCommas(dataToNumber(shipsCost['espionage_probe'].deuterium)),
        },
        satellite: {
          metal: numberWithCommas(dataToNumber(shipsCost['solar_satellite'].metal)),
          crystal: numberWithCommas(dataToNumber(shipsCost['solar_satellite'].crystal)),
          deuterium: numberWithCommas(dataToNumber(shipsCost['solar_satellite'].deuterium)),
        },
        fighter: {
          metal: numberWithCommas(dataToNumber(shipsCost['light_fighter'].metal)),
          crystal: numberWithCommas(dataToNumber(shipsCost['light_fighter'].crystal)),
          deuterium: numberWithCommas(dataToNumber(shipsCost['light_fighter'].deuterium)),
        },
        cruiser: {
          metal: numberWithCommas(dataToNumber(shipsCost['cruiser'].metal)),
          crystal: numberWithCommas(dataToNumber(shipsCost['cruiser'].crystal)),
          deuterium: numberWithCommas(dataToNumber(shipsCost['cruiser'].deuterium)),
        },
        battleship: {
          metal: numberWithCommas(dataToNumber(shipsCost['battleship'].metal)),
          crystal: numberWithCommas(dataToNumber(shipsCost['battleship'].crystal)),
          deuterium: numberWithCommas(dataToNumber(shipsCost['battleship'].deuterium)),
        },
      }
    }
  }, [shipsCost])

  const techLevels = useMemo(() => {
    if (technologiesLevels) {
      return {
        armour: dataToNumber(technologiesLevels['result'].armour_tech),
        astrophysics: dataToNumber(technologiesLevels['result'].astrophysics),
        combustion: dataToNumber(technologiesLevels['result'].combustion_drive),
        computer: dataToNumber(technologiesLevels['result'].computer_tech),
        energy: dataToNumber(technologiesLevels['result'].energy_tech),
        espionage: dataToNumber(technologiesLevels['result'].espionage_tech),
        hyperspaceDrive: dataToNumber(technologiesLevels['result'].hyperspace_drive),
        hyperspaceTech: dataToNumber(technologiesLevels['result'].hyperspace_tech),
        impulse: dataToNumber(technologiesLevels['result'].impulse_drive),
        ion: dataToNumber(technologiesLevels['result'].ion_tech),
        laser: dataToNumber(technologiesLevels['result'].laser_tech),
        plasma: dataToNumber(technologiesLevels['result'].plasma_tech),
        shielding: dataToNumber(technologiesLevels['result'].shielding_tech),
        weapons: dataToNumber(technologiesLevels['result'].weapons_tech),
      }
    }
  }, [technologiesLevels])

  const techCostUpgrade = useMemo(() => {
    if (techUpgradesCost) {
      return {
        armour: {
          metal: numberWithCommas(dataToNumber(techUpgradesCost['armour_tech'].metal)),
          crystal: numberWithCommas(dataToNumber(techUpgradesCost['armour_tech'].crystal)),
          deuterium: numberWithCommas(dataToNumber(techUpgradesCost['armour_tech'].deuterium)),
        },
        astrophysics: {
          metal: numberWithCommas(dataToNumber(techUpgradesCost['astrophysics'].metal)),
          crystal: numberWithCommas(dataToNumber(techUpgradesCost['astrophysics'].crystal)),
          deuterium: numberWithCommas(dataToNumber(techUpgradesCost['astrophysics'].deuterium)),
        },
        combustion: {
          metal: numberWithCommas(dataToNumber(techUpgradesCost['combustion_drive'].metal)),
          crystal: numberWithCommas(dataToNumber(techUpgradesCost['combustion_drive'].crystal)),
          deuterium: numberWithCommas(dataToNumber(techUpgradesCost['combustion_drive'].deuterium)),
        },
        computer: {
          metal: numberWithCommas(dataToNumber(techUpgradesCost['computer_tech'].metal)),
          crystal: numberWithCommas(dataToNumber(techUpgradesCost['computer_tech'].crystal)),
          deuterium: numberWithCommas(dataToNumber(techUpgradesCost['computer_tech'].deuterium)),
        },
        energy: {
          metal: numberWithCommas(dataToNumber(techUpgradesCost['energy_tech'].metal)),
          crystal: numberWithCommas(dataToNumber(techUpgradesCost['energy_tech'].crystal)),
          deuterium: numberWithCommas(dataToNumber(techUpgradesCost['energy_tech'].deuterium)),
        },
        espionage: {
          metal: numberWithCommas(dataToNumber(techUpgradesCost['espionage_tech'].metal)),
          crystal: numberWithCommas(dataToNumber(techUpgradesCost['espionage_tech'].crystal)),
          deuterium: numberWithCommas(dataToNumber(techUpgradesCost['espionage_tech'].deuterium)),
        },
        hyperspaceDrive: {
          metal: numberWithCommas(dataToNumber(techUpgradesCost['hyperspace_drive'].metal)),
          crystal: numberWithCommas(dataToNumber(techUpgradesCost['hyperspace_drive'].crystal)),
          deuterium: numberWithCommas(dataToNumber(techUpgradesCost['hyperspace_drive'].deuterium)),
        },
        hyperspaceTech: {
          metal: numberWithCommas(dataToNumber(techUpgradesCost['hyperspace_tech'].metal)),
          crystal: numberWithCommas(dataToNumber(techUpgradesCost['hyperspace_tech'].crystal)),
          deuterium: numberWithCommas(dataToNumber(techUpgradesCost['hyperspace_tech'].deuterium)),
        },
        impulse: {
          metal: numberWithCommas(dataToNumber(techUpgradesCost['impulse_drive'].metal)),
          crystal: numberWithCommas(dataToNumber(techUpgradesCost['impulse_drive'].crystal)),
          deuterium: numberWithCommas(dataToNumber(techUpgradesCost['impulse_drive'].deuterium)),
        },
        ion: {
          metal: numberWithCommas(dataToNumber(techUpgradesCost['ion_tech'].metal)),
          crystal: numberWithCommas(dataToNumber(techUpgradesCost['ion_tech'].crystal)),
          deuterium: numberWithCommas(dataToNumber(techUpgradesCost['ion_tech'].deuterium)),
        },
        laser: {
          metal: numberWithCommas(dataToNumber(techUpgradesCost['laser_tech'].metal)),
          crystal: numberWithCommas(dataToNumber(techUpgradesCost['laser_tech'].crystal)),
          deuterium: numberWithCommas(dataToNumber(techUpgradesCost['laser_tech'].deuterium)),
        },
        plasma: {
          metal: numberWithCommas(dataToNumber(techUpgradesCost['plasma_tech'].metal)),
          crystal: numberWithCommas(dataToNumber(techUpgradesCost['plasma_tech'].crystal)),
          deuterium: numberWithCommas(dataToNumber(techUpgradesCost['plasma_tech'].deuterium)),
        },
        shielding: {
          metal: numberWithCommas(dataToNumber(techUpgradesCost['shielding_tech'].metal)),
          crystal: numberWithCommas(dataToNumber(techUpgradesCost['shielding_tech'].crystal)),
          deuterium: numberWithCommas(dataToNumber(techUpgradesCost['shielding_tech'].deuterium)),
        },
        weapons: {
          metal: numberWithCommas(dataToNumber(techUpgradesCost['weapons_tech'].metal)),
          crystal: numberWithCommas(dataToNumber(techUpgradesCost['weapons_tech'].crystal)),
          deuterium: numberWithCommas(dataToNumber(techUpgradesCost['weapons_tech'].deuterium)),
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
