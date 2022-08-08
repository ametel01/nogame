import { FC, useEffect, useMemo, useState } from 'react'
import Row, { RowBetween, RowCentered } from '~/components/Row'
import styled from 'styled-components'
import axios from 'axios'

import { ImageIcon } from '~/components/Icons/Image'
import Column from '~/components/Column'
import { PlanetIcon } from '~/components/Icons/Planet'
import { ScaleIcon } from '~/components/Icons/Scale'
import { TemperatureIcon } from '~/components/Icons/Temperature'
import { useStarknet, useStarknetCall } from '@starknet-react/core'
import { useGameContract } from '~/hooks/game'
import { bigDataToNumber, dataToNumber } from '~/utils'
import { useErc721Contract } from '~/hooks/erc721'
import { BigNumber } from 'bignumber.js'
import Image from 'next/image'

const PlanetImageWrapper = styled(RowCentered)`
  height: 150px;
  width: 150px;
  border-radius: 20px;
  background: #192125;
  overflow: hidden;
`
const MainContainer = styled(RowCentered)`
  gap: 48px;
`

const PlanetInfoContainer = styled(Column)`
  gap: 6px;
  color: white;
  width: 352px;
`

const PlanetInfoRow = styled(RowBetween)`
  gap: 16px;
  width: 100%;
`

const PlanetInfoKey = styled.div`
  text-transform: uppercase;
  opacity: 50%;
  font-weight: 700;

  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.02em;
`

const PlanetInfoValue = styled(Row)`
  width: auto;
  gap: 8px;

  font-weight: 400;
  font-size: 16px;
  line-height: 21px;

  letter-spacing: 0.02em;
`

function hex2a(hex: string) {
  let str = ''
  for (let i = 0; i < hex.length; i += 2) {
    const v = parseInt(hex.substring(i, i + 2), 16)
    if (v) str += String.fromCharCode(v)
  }
  return str
}

const PlanetImage = ({ planetId }: { planetId: any }) => {
  const ipfsUrl = 'https://gateway.pinata.cloud/ipfs/'
  const [metadata, setMetadata] = useState<any>()
  const { contract: ercContract } = useErc721Contract()
  const { data } = useStarknetCall({
    contract: ercContract,
    method: 'tokenURI',
    args: [planetId],
  })

  useEffect(() => {
    if (data && !metadata) {
      const tokenUri = data['token_uri']

      const uri = tokenUri.reduce((acc, tu) => {
        const hashName = new BigNumber(tu).toString(16)
        return `${acc}${hex2a(hashName)}`
      }, '')

      const url = `${ipfsUrl}${uri.replace('ipfs://', '')}.json`

      axios
        .get(url)
        .then((result) => {
          setMetadata(result.data as any)
        })
        .catch((e) => console.error(e))
    }
  }, [data, setMetadata, metadata])

  // const imgUrl = (ipfs: string) => `${ipfsUrl}${ipfs.replace('ipfs/', '')}`
  const imgNumber = useMemo(() => {
    if (metadata) {
      const splitHash = metadata.image.split('/')
      const imgFormat = splitHash[splitHash.length - 1]
      return Number(imgFormat.split('.')[0])
    }
  }, [metadata])

  const findAttribute = (name: string) =>
    metadata?.attributes.find(({ trait_type }) => trait_type === name)?.value || '-'

  return (
    <>
      <PlanetImageWrapper>
        {metadata?.image ? <Image src={`/planets/${imgNumber}.png`} width={150} height={152} /> : <ImageIcon />}{' '}
      </PlanetImageWrapper>

      <PlanetInfoContainer>
        <PlanetInfoRow>
          <PlanetInfoKey>Position</PlanetInfoKey>
          <PlanetInfoValue>
            <PlanetIcon />
            {findAttribute('position')}
          </PlanetInfoValue>
        </PlanetInfoRow>
        <PlanetInfoRow>
          <PlanetInfoKey>Size</PlanetInfoKey>
          <PlanetInfoValue>
            <ScaleIcon />
            {findAttribute('size')}
          </PlanetInfoValue>
        </PlanetInfoRow>
        <PlanetInfoRow>
          <PlanetInfoKey>Temp</PlanetInfoKey>
          <PlanetInfoValue>
            <TemperatureIcon />
            {findAttribute('temperature')}
          </PlanetInfoValue>
        </PlanetInfoRow>
      </PlanetInfoContainer>
    </>
  )
}

export const PlanetSection: FC = () => {
  const { account } = useStarknet()
  const { contract: erc721Contract } = useErc721Contract()
  const { data } = useStarknetCall({
    contract: erc721Contract,
    method: 'ownerToPlanet',
    args: [account],
  })

  const planetId = data && data['token_id']

  return (
    <RowCentered>
      <MainContainer>
        <PlanetImage planetId={planetId} />
      </MainContainer>
    </RowCentered>
  )
}
