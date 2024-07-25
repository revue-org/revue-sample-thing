import { thingService } from '@/index.js'

export const toggleHandler = async (params: any): Promise<string> => {
  const intent: boolean = (await params.value()).enable
  if (intent === thingService.isActive()) {
    return 'Device already ' + thingService.isActive() ? 'enabled' : 'disabled'
  }
  intent ? await thingService.enable() : await thingService.disable()
  console.log('Action: Device toggled: ' + thingService.isActive() ? 'enabled' : 'disabled')
  return 'Device ' + thingService.isActive() ? 'enabled' : 'disabled'
}
