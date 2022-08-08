import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'
import abi from './abi/erc721.json'

export function useErc721Contract() {
  return useContract({
    abi: abi as Abi,
    address: '0x0355ef0b5d68e00be979c26b608b574b6390cac330bbd7655b8865032039803e',
  })
}
