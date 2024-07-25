import { thingService } from '@/index.js'

export const statusHandler = () => {
  console.log('Properties: Reading status')
  return thingService.getState()
}
