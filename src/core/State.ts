import { Capability } from '@/core/Capability'

export interface State {
  id: string,
  location: string,
  enabled: boolean,
  capabilities: Capability[]
}

export let state: State = {
  id: THING_ID,
  location: THING_LOCATION,
  enabled: true,
  capabilities: [{
    type: 'sensor',
    capturingInterval: 2500,
    measure: {
      type: 'temperature',
      unit: 'celsius'
    }
  }]
}