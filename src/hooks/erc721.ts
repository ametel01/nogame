import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'
import abi from './abi/erc721.json'

export function useErc721Contract() {
  return useContract({
    abi: abi as Abi,
    address: '0x05294dc933146d345a198be122ccf780bd9ee6bcd5125b9d0b90a3c0c933f400',
  })
}
