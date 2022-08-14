import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'
import abi from './abi/main.json'

export function useGameContract() {
  return useContract({
    abi: abi as Abi,
    address: '0x05c1d38a6d65e0c048e2ef7f1b11d4f863c64ce66af9b944a904304a72ae54e2',
  })
}
