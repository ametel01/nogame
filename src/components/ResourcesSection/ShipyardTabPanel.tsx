import { StyledTabPanel } from './styleds'
import { useState } from 'react'
import { FleetCost, EndTimeCompletion, Points, FleetLevels } from '~/utils/types'
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
  fleetLevels?: FleetLevels
  FleetCost?: FleetCost
}

export const ShipyardTabPanel = ({ endTimeCompletion, playerResources, fleetLevels, FleetCost, ...rest }: Props) => {
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
        functionCallName="cargoShip"
        level={fleetLevels?.cargo}
        time={getEndTime(1)}
        isUpgrading={isUpgrading}
        costUpdate={FleetCost?.cargo}
        hasEnoughResources={playerResources && FleetCost && calculEnoughResources(FleetCost.cargo, playerResources)}
      />
      <ResourceBox
        img={ProbeImg}
        title="Espionage Probe"
        functionCallName="espionageProbe"
        level={fleetLevels?.probe}
        time={getEndTime(2)}
        costUpdate={FleetCost?.probe}
        isUpgrading={isUpgrading}
        hasEnoughResources={playerResources && FleetCost && calculEnoughResources(FleetCost.probe, playerResources)}
      />
      <ResourceBox
        img={SatelliteImg}
        title="Solar Satellite"
        functionCallName="solarSatellite"
        level={fleetLevels?.satellite}
        time={getEndTime(3)}
        costUpdate={FleetCost?.satellite}
        isUpgrading={isUpgrading}
        hasEnoughResources={playerResources && FleetCost && calculEnoughResources(FleetCost.satellite, playerResources)}
      />
      <ResourceBox
        img={FighterImg}
        title="Light Fighter"
        functionCallName="lightFighter"
        level={fleetLevels?.fighter}
        time={getEndTime(4)}
        costUpdate={FleetCost?.fighter}
        isUpgrading={isUpgrading}
        hasEnoughResources={playerResources && FleetCost && calculEnoughResources(FleetCost.fighter, playerResources)}
      />
      <ResourceBox
        img={RecyclerImg}
        title="Recycler"
        functionCallName="recyclerShip"
        level={fleetLevels?.recycler}
        time={getEndTime(4)}
        costUpdate={FleetCost?.recycler}
        isUpgrading={isUpgrading}
        hasEnoughResources={playerResources && FleetCost && calculEnoughResources(FleetCost.recycler, playerResources)}
      />
      <ResourceBox
        img={CruiserImg}
        title="Cruiser"
        functionCallName="cruiserBuild"
        level={fleetLevels?.cruiser}
        time={getEndTime(4)}
        costUpdate={FleetCost?.cruiser}
        isUpgrading={isUpgrading}
        hasEnoughResources={playerResources && FleetCost && calculEnoughResources(FleetCost.cruiser, playerResources)}
      />
      <ResourceBox
        img={BattleshipImg}
        title="Battle Ship"
        functionCallName="battleShip"
        level={fleetLevels?.battleship}
        time={getEndTime(4)}
        costUpdate={FleetCost?.battleship}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && FleetCost && calculEnoughResources(FleetCost.battleship, playerResources)
        }
      />
    </StyledTabPanel>
  )
}

ShipyardTabPanel.tabsRole = 'TabPanel'
