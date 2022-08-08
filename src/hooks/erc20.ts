import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'
import abi from './abi/erc20.json'

export function useMetalContract() {
  return useContract({
    abi: abi as Abi,
    address: '0x01d113c79ac4828e4a6dd910e4b3da97f77c141900f62f7bf4a5052c08a99cfa',
  })
}

export function useCrystalContract() {
  return useContract({
    abi: abi as Abi,
    address: '0x047ddc05aa8247073b534e1a3bc5dde5fbfb03a42f7a59a9abf2f71f3acf0bbf',
  })
}

export function useDeuteriumContract() {
  return useContract({
    abi: abi as Abi,
    address: '0x02180ef049384f9746dd06de79a47d0e3ba07f28f9818def03ed1e718f5e2ac5',
  })
}
