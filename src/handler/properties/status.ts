import { thingService } from '@/index.js'

export const statusHandler = () => {
  console.log('Reading status')
  return thingService.getState()
}