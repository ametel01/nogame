import { StyledTabPanel } from './styleds'
import { useState } from 'react'
import { TechCostUpgrade, EndTimeCompletion, Points, TechLevels } from '~/utils/types'
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
  techLevels?: TechLevels
  TechCostUpgrade?: TechCostUpgrade
}

export const ResearchTabPanel = ({
  endTimeCompletion,
  playerResources,
  techLevels,
  TechCostUpgrade,
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
        functionCallName="armourTech"
        level={techLevels?.armour}
        time={getEndTime(5)}
        costUpdate={TechCostUpgrade?.armour}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && TechCostUpgrade && calculEnoughResources(TechCostUpgrade.armour, playerResources)
        }
      />
      <ResourceBox
        img={AstrophysicsImg}
        title="Astrophysics"
        functionCallName="astrophysics"
        level={techLevels?.astrophysics}
        time={getEndTime(5)}
        costUpdate={TechCostUpgrade?.astrophysics}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && TechCostUpgrade && calculEnoughResources(TechCostUpgrade.astrophysics, playerResources)
        }
      />
      <ResourceBox
        img={CombustionImg}
        title="Combustion Drive"
        functionCallName="combustionDrive"
        level={techLevels?.combustion}
        time={getEndTime(5)}
        costUpdate={TechCostUpgrade?.combustion}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && TechCostUpgrade && calculEnoughResources(TechCostUpgrade.combustion, playerResources)
        }
      />
      <ResourceBox
        img={ComputerImg}
        title="Computer Tech"
        functionCallName="computerTech"
        level={techLevels?.computer}
        time={getEndTime(5)}
        costUpdate={TechCostUpgrade?.computer}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && TechCostUpgrade && calculEnoughResources(TechCostUpgrade.computer, playerResources)
        }
      />
      <ResourceBox
        img={EnergyImg}
        title="Energy Tech"
        functionCallName="energyTech"
        level={techLevels?.energy}
        time={getEndTime(5)}
        costUpdate={TechCostUpgrade?.energy}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && TechCostUpgrade && calculEnoughResources(TechCostUpgrade.energy, playerResources)
        }
      />
      <ResourceBox
        img={EspionageImg}
        title="Espionage Tech"
        functionCallName="espionageTech"
        level={techLevels?.espionage}
        time={getEndTime(5)}
        costUpdate={TechCostUpgrade?.espionage}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && TechCostUpgrade && calculEnoughResources(TechCostUpgrade.espionage, playerResources)
        }
      />
      <ResourceBox
        img={HyperspaceDriveImg}
        title="Hyperspace Drive"
        functionCallName="hyperspaceDrive"
        level={techLevels?.hyperspaceDrive}
        time={getEndTime(5)}
        costUpdate={TechCostUpgrade?.hyperspaceDrive}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && TechCostUpgrade && calculEnoughResources(TechCostUpgrade.hyperspaceDrive, playerResources)
        }
      />
      <ResourceBox
        img={HyperspaceTechImg}
        title="Hyperspace Tech"
        functionCallName="hyperspaceTech"
        level={techLevels?.hyperspaceTech}
        time={getEndTime(5)}
        costUpdate={TechCostUpgrade?.hyperspaceTech}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && TechCostUpgrade && calculEnoughResources(TechCostUpgrade.hyperspaceTech, playerResources)
        }
      />
      <ResourceBox
        img={ImpulseImg}
        title="Impulse Drive"
        functionCallName="impulseDrive"
        level={techLevels?.impulse}
        time={getEndTime(5)}
        costUpdate={TechCostUpgrade?.impulse}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && TechCostUpgrade && calculEnoughResources(TechCostUpgrade.impulse, playerResources)
        }
      />
      <ResourceBox
        img={IonImg}
        title="Ion Tech"
        functionCallName="ionTech"
        level={techLevels?.ion}
        time={getEndTime(5)}
        costUpdate={TechCostUpgrade?.ion}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && TechCostUpgrade && calculEnoughResources(TechCostUpgrade.ion, playerResources)
        }
      />
      <ResourceBox
        img={LaserImg}
        title="Laser Tech"
        functionCallName="laserTech"
        level={techLevels?.laser}
        time={getEndTime(5)}
        costUpdate={TechCostUpgrade?.laser}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && TechCostUpgrade && calculEnoughResources(TechCostUpgrade.laser, playerResources)
        }
      />
      <ResourceBox
        img={PlasmaImg}
        title="Plasma Tech"
        functionCallName="plasmaTech"
        level={techLevels?.plasma}
        time={getEndTime(5)}
        costUpdate={TechCostUpgrade?.plasma}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && TechCostUpgrade && calculEnoughResources(TechCostUpgrade.plasma, playerResources)
        }
      />
      <ResourceBox
        img={ShieldingImg}
        title="Shielding Tech"
        functionCallName="shieldingTech"
        level={techLevels?.shielding}
        time={getEndTime(5)}
        costUpdate={TechCostUpgrade?.shielding}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && TechCostUpgrade && calculEnoughResources(TechCostUpgrade.shielding, playerResources)
        }
      />
      <ResourceBox
        img={WeaponsImg}
        title="Weapons Tech"
        functionCallName="weaponsTech"
        level={techLevels?.weapons}
        time={getEndTime(5)}
        costUpdate={TechCostUpgrade?.weapons}
        isUpgrading={isUpgrading}
        hasEnoughResources={
          playerResources && TechCostUpgrade && calculEnoughResources(TechCostUpgrade.weapons, playerResources)
        }
      />
    </StyledTabPanel>
  )
}

ResearchTabPanel.tabsRole = 'TabPanel'
