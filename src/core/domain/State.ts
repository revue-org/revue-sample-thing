import { Capability } from '@/core/domain/Capability'

export interface State {
  id: string,
  location: string,
  enabled: boolean,
  capabilities: Capability[]
}