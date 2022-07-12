import { StyledTabPanel } from './styleds'
import styled from 'styled-components'
import { CostUpgrade, EndTimeCompletion, Points, ResourceLevels } from '~/utils/types'
import ResourceBox from '~/components/ResourceBox'
import RobotImg from '~/assets/resources/solar_satellite.jpg'
import { calculEnoughResources } from '~/utils'
import { useState } from 'react'

const EmptyBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #363636;
  max-width: 200px;
  height: 150px;
  border-radius: 5px;
`

const EmptyContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
interface Props {
  endTimeCompletion?: EndTimeCompletion
  playerResources?: Points
  resourceLevels?: ResourceLevels
  costUpgrade?: CostUpgrade
}

export const FacilitiesTabPanel = ({
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
        img={RobotImg}
        title="Robot Factory"
        functionCallName="robot_factory"
        level={resourceLevels?.robotFactory}
        time={getEndTime(5)}
        costUpdate={costUpgrade?.robotFactory}
        isUpgrading={isUpgrading}
        hasEnoughResources={playerResources && costUpgrade && calculEnoughResources(costUpgrade.robotFactory, points)}
      />
    </StyledTabPanel>
  )
}

FacilitiesTabPanel.tabsRole = 'TabPanel'
