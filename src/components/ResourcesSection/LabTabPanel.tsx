import { StyledTabPanel } from './styleds'
import { useState } from 'react'
import { CostUpgrade, EndTimeCompletion, Points, ResourceLevels } from '~/utils/types'
import ResourceBox from '~/components/ResourceBox'
import { calculEnoughResources } from '~/utils'
import ArmourImg from '~/assets/research_lab/armour_tech.jpg'
import AstrophysicsImg from '~/assets/research_lab/astrophysics.jpg'
import CombustionImg from '~/assets/research_lab/combustion_drive.jpg'
import ComputerImg from '~/assets/research_lab/computer_tech.jpg'
import EnergyImg from '~/assets/research_lab/energy_tech.jpg'
import EspionageImg from '~/assets/research_lab/espionage_tech.jpg'
import HyperspaceDriveImg from '~/assets/research_lab/hyperspace_drive.jpg'
import HyperspaceTechImg from '~/assets/research_lab/hyperspace_tech.jpg'
import ImpulseImg from '~/assets/research_lab/impulse_drive.jpg'
import IonImg from '~/assets/research_lab/ion_tech.jpg'
import LaserImg from '~/assets/research_lab/laser_tech.jpg'
import PlasmaImg from '~/assets/research_lab/plasma_tech.jpg'
import ShieldingImg from '~/assets/research_lab/shielding_tech.jpg'
import WeaponsImg from '~/assets/research_lab/weapons_tech.jpg'

interface Props {
  endTimeCompletion?: EndTimeCompletion
  playerResources?: Points
  resourceLevels?: ResourceLevels
  costUpgrade?: CostUpgrade
}

export const ResearchTabPanel = ({
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
        img={ArmourImg}
        title="Armour Tech"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.robotFactory, playerResources)
        }
      />
      <ResourceBox
        img={AstrophysicsImg}
        title="Astrophysics"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.robotFactory, playerResources)
        }
      />
      <ResourceBox
        img={CombustionImg}
        title="Combustion Drive"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.robotFactory, playerResources)
        }
      />
      <ResourceBox
        img={ComputerImg}
        title="Computer Tech"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.robotFactory, playerResources)
        }
      />
      <ResourceBox
        img={EnergyImg}
        title="Energy Tech"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.robotFactory, playerResources)
        }
      />
      <ResourceBox
        img={EspionageImg}
        title="Espionage Tech"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.robotFactory, playerResources)
        }
      />
      <ResourceBox
        img={HyperspaceDriveImg}
        title="Hyperspace Drive"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.robotFactory, playerResources)
        }
      />
      <ResourceBox
        img={HyperspaceTechImg}
        title="Hyperspace Tech"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.robotFactory, playerResources)
        }
      />
      <ResourceBox
        img={ImpulseImg}
        title="Impulse Drive"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.robotFactory, playerResources)
        }
      />
      <ResourceBox
        img={IonImg}
        title="Ion Tech"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.robotFactory, playerResources)
        }
      />
      <ResourceBox
        img={LaserImg}
        title="Laser Tech"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.robotFactory, playerResources)
        }
      />
      <ResourceBox
        img={PlasmaImg}
        title="Plasma Tech"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.robotFactory, playerResources)
        }
      />
      <ResourceBox
        img={ShieldingImg}
        title="Shielding Tech"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.robotFactory, playerResources)
        }
      />
      <ResourceBox
        img={WeaponsImg}
        title="Weapons Tech"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && costUpgrade && calculEnoughResources(costUpgrade.robotFactory, playerResources)
        }
      />
    </StyledTabPanel>
  )
}

ResearchTabPanel.tabsRole = 'TabPanel'
