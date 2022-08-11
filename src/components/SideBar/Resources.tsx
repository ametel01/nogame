import { useStarknet, useStarknetCall } from '@starknet-react/core'
import { useGameContract } from '~/hooks/game'
import { useMetalContract, useCrystalContract, useDeuteriumContract } from '~/hooks/erc20'
import { useMemo, useState } from 'react'
import { BigNumber } from 'bignumber.js'
import { uint256 } from 'starknet'
import styled from 'styled-components'
import Image from 'next/image'

import iron from '../../assets/resources/nogameiron.png'
import crystal from '../../assets/resources/nogamecrystal.png'
import deuterium from '../../assets/resources/nogamedeuterium.png'
import energy from '../../assets/resources/nogameenergy.png'

import coins from '../../assets/icons/Coins.svg'
import gem from '../../assets/icons/Gem.svg'
import atom from '../../assets/icons/Atom.svg'
import bolt from '../../assets/icons/Bolt.svg'
import { dataToNumber, E18ToNumber, numberWithCommas } from '~/utils'

const Container = styled.div`
  //width: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  //justify-content: space-between;
  padding: 4px 16px;
  //gap: 12px;

  //width: 100%;
  //height: 56px;

  flex: none;
  //order: 2;
  align-self: stretch;
  //flex-grow: 0;
  //background-color: blueviolet;
  //margin-bottom: 10px;
  border-top: 2px solid #151a1e;
`

interface Props {
  total?: number
  img: any
  iconImg: any
  title: string
  address?: string
}

const TotalResourceText = styled.div`
  color: #81d3ff;
  font-weight: 500;
  margin-left: 5px;
`

const TotalResourceContainer = styled.div`
  display: flex;
`

const TotalResourceWrapper = styled.div`
  margin-left: 30px;
`
const ResourceAddress = styled.div`
  font-size: 12px;
`

const ImageAddressContainer = styled.div`
  min &:hover {
    cursor: pointer;
  }
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  min-width: 50px;
`

const Resource = ({ total, img, iconImg, title, address }: Props) => {
  const [copied, setCopied] = useState(false)
  return (
    <Container>
      <ImageAddressContainer
        onClick={() => {
          if (address) {
            const blob = new Blob([address], { type: 'text/plain' })
            const item = new ClipboardItem({ 'text/plain': blob })
            navigator.clipboard.write([item]).then(() => setCopied(true))
          }
        }}
      >
        <div style={{ width: '30px' }}>
          <Image src={img} alt="resource" objectFit="contain" />
        </div>
        {address && !copied && <ResourceAddress>{`${address.substring(0, 6)}...`}</ResourceAddress>}
        {copied && <ResourceAddress>Copied</ResourceAddress>}
      </ImageAddressContainer>
      <TotalResourceWrapper>
        {title}
        <TotalResourceContainer>
          <Image src={iconImg} alt="icon-resource" objectFit="contain" />
          <TotalResourceText>{total}</TotalResourceText>
        </TotalResourceContainer>
      </TotalResourceWrapper>
    </Container>
  )
}

const ResourcesContainer = () => {
  const { account } = useStarknet()
  const { contract: gameContract } = useGameContract()
  const { data: res } = useStarknetCall({
    contract: gameContract,
    method: 'getResourcesAvailable',
    args: [account],
  })

  const resources = useMemo(() => {
    if (res) {
      return {
        metal: numberWithCommas(E18ToNumber(res['metal'])),
        crystal: numberWithCommas(E18ToNumber(res['crystal'])),
        deuterium: numberWithCommas(E18ToNumber(res['deuterium'])),
        energy: numberWithCommas(dataToNumber(res['energy'])),
      }
    }
  }, [res])
  return (
    <div>
      <Resource
        title="Metal"
        address="0x01d113c79ac4828e4a6dd910e4b3da97f77c141900f62f7bf4a5052c08a99cfa"
        img={iron}
        iconImg={coins}
        total={resources?.metal}
      />
      <Resource
        title="Crystal"
        address="0x047ddc05aa8247073b534e1a3bc5dde5fbfb03a42f7a59a9abf2f71f3acf0bbf"
        img={crystal}
        iconImg={gem}
        total={resources?.crystal}
      />
      <Resource
        title="Deuterium"
        address="0x02180ef049384f9746dd06de79a47d0e3ba07f28f9818def03ed1e718f5e2ac5"
        img={deuterium}
        iconImg={atom}
        total={resources?.deuterium}
      />
      <Resource title="Energy" address="" img={energy} iconImg={bolt} total={resources?.energy} />
    </div>
  )
}

export default ResourcesContainer
