import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'
import abi from './abi/main.json'

export function useGameContract() {
  return useContract({
    abi: abi as Abi,
    address: '0x009d8324d25911f6c31da99e1ea4ad8561ee22579d5b263b5c13efef57114586',
  })
}
