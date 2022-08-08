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

  const { data: upgradesCost } = useStarknetCall({
    contract: gameContract,
    method: 'getResourcesUpgradeCost',
    args: [account],
  })

  const { data: structureLevels } = useStarknetCall({
    contract: gameContract,
    method: 'getResourcesBuildingsLevels',
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
    if (structureLevels) {
      return {
        metal: dataToNumber(structureLevels['metal_mine']),
        crystal: dataToNumber(structureLevels['crystal_mine']),
        deuterium: dataToNumber(structureLevels['deuterium_mine']),
        solarPlant: dataToNumber(structureLevels['solar_plant']),
        robotFactory: dataToNumber(structureLevels['robot_factory']),
      }
    }
  }, [structureLevels])

  const costUpgrade = useMemo(() => {
    if (upgradesCost) {
      return {
        metal: {
          metal: dataToNumber(upgradesCost['metal_mine'].metal),
          crystal: dataToNumber(upgradesCost['metal_mine'].crystal),
          energy: dataToNumber(upgradesCost['metal_mine'].energy_cost),
        },
        crystal: {
          metal: dataToNumber(upgradesCost['crystal_mine'].metal),
          crystal: dataToNumber(upgradesCost['crystal_mine'].crystal),
          energy: dataToNumber(upgradesCost['crystal_mine'].energy_cost),
        },
        deuterium: {
          metal: dataToNumber(upgradesCost['deuterium_mine'].metal),
          crystal: dataToNumber(upgradesCost['deuterium_mine'].crystal),
          energy: dataToNumber(upgradesCost['deuterium_mine'].energy_cost),
        },
        solarPlant: {
          metal: dataToNumber(upgradesCost['solar_plant'].metal),
          crystal: dataToNumber(upgradesCost['solar_plant'].crystal),
          energy: dataToNumber(upgradesCost['solar_plant'].energy_cost),
        },
        // robotFactory: {
        //   metal: dataToNumber(data['robot_factory'].metal),
        //   crystal: dataToNumber(data['robot_factory'].crystal),
        //   deuterium: dataToNumber(data['robot_factory'].deuterium),
        // },
      }
    }
  }, [upgradesCost])

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
        costUpgrade={costUpgrade}
      />
      <FacilitiesTabPanel
        endTimeCompletion={endTimeCompletion}
        playerResources={playerResources}
        resourceLevels={resourceLevels}
        costUpgrade={costUpgrade}
      />
      <ShipyardTabPanel
        endTimeCompletion={endTimeCompletion}
        playerResources={playerResources}
        resourceLevels={resourceLevels}
        costUpgrade={costUpgrade}
      />
      <ResearchTabPanel
        endTimeCompletion={endTimeCompletion}
        playerResources={playerResources}
        resourceLevels={resourceLevels}
        costUpgrade={costUpgrade}
      />
      <EmptyTabPanel />
    </ResourcesTabs>
  )
}
