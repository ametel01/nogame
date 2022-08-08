import { StyledTabPanel } from './styleds'
import { useState } from 'react'
import { CostUpgrade, EndTimeCompletion, Points, ResourceLevels } from '~/utils/types'
import ResourceBox from '~/components/ResourceBox'
import { calculEnoughResources } from '~/utils'
import BattleshipImg from '~/assets/shipyard/battleship.jpg'
import CruiserImg from '~/assets/shipyard/cruiser.jpg'
import ProbeImg from '~/assets/shipyard/espionage_probe.jpg'
import CargoImg from '~/assets/shipyard/light_cargo.jpg'
import FighterImg from '~/assets/shipyard/light_fighter.jpg'
import RecyclerImg from '~/assets/shipyard/recycler.jpg'
import SatelliteImg from '~/assets/shipyard/solar_satellite.jpg'

interface Props {
  endTimeCompletion?: EndTimeCompletion
  playerResources?: Points
  resourceLevels?: ResourceLevels
  costUpgrade?: CostUpgrade
}

export const ShipyardTabPanel = ({
  endTimeCompletion,
  playerResources,
  resourceLevels,
  costUpgrade,
  ...rest
}: Props) => {
  const [isUpgrading, setIsUpgrading] = useState(false)
  const getEndTime = (resourceId: number) => {
    if (endTimeCompletion?.resourceId === resourceId) {
      if (endTimeCompletion?.timeEnd > 0 && !isUpgrading) {
        setIsUpgrading(true)
      }
      return endTimeCompletion.timeEnd
    }
    return undefined
  }

  return (
    <StyledTabPanel {...rest}>
      <ResourceBox
        img={CargoImg}
        title="Light Cargo"
        functionCallName="metal"
        level={resourceLevels?.metal}
        time={getEndTime(1)}
        isUpgrading={isUpgrading}
        costUpdate={costUpgrade?.metal}
        hasEnoughResources={playerResources && costUpgrade && calculEnoughResources(costUpgrade.metal, playerResources)}
      />
      <ResourceBox
        img={ProbeImg}
        title="Espionage Probe"
        functionCallName="crystal"
        level={resourceLevels?.crystal}
        time={getEndTime(2)}
        costUpdate={costUpgrade?.crystal}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.crystal, playerResources)
        }
      />
      <ResourceBox
        img={SatelliteImg}
        title="Solar Satellite"
        functionCallName="deuterium"
        level={resourceLevels?.deuterium}
        time={getEndTime(3)}
        costUpdate={costUpgrade?.deuterium}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.deuterium, playerResources)
        }
      />
      <ResourceBox
        img={FighterImg}
        title="Light Fighter"
        functionCallName="solar_plant"
        level={resourceLevels?.solarPlant}
        time={getEndTime(4)}
        costUpdate={costUpgrade?.solarPlant}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.solarPlant, playerResources)
        }
      />
      <ResourceBox
        img={RecyclerImg}
        title="Recycler"
        functionCallName="solar_plant"
        level={resourceLevels?.solarPlant}
        time={getEndTime(4)}
        costUpdate={costUpgrade?.solarPlant}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.solarPlant, playerResources)
        }
      />
      <ResourceBox
        img={CruiserImg}
        title="Cruiser"
        functionCallName="solar_plant"
        level={resourceLevels?.solarPlant}
        time={getEndTime(4)}
        costUpdate={costUpgrade?.solarPlant}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.solarPlant, playerResources)
        }
      />
      <ResourceBox
        img={BattleshipImg}
        title="Battle Ship"
        functionCallName="solar_plant"
        level={resourceLevels?.solarPlant}
        time={getEndTime(4)}
        costUpdate={costUpgrade?.solarPlant}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.solarPlant, playerResources)
        }
      />
    </StyledTabPanel>
  )
}

ShipyardTabPanel.tabsRole = 'TabPanel'
