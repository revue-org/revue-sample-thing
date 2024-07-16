import { Servient } from '@node-wot/core'
import HttpServer from '@node-wot/binding-http'
import { td } from './thing-descriptor.js'
import { toggleHandler } from '@/handler/actions/toggle.js'
import { statusHandler } from '@/handler/properties/status.js'
import { validation } from '@/utils/middleware.js'
import { initialState } from '@/utils/initialState.js'
import { ThingService } from '@/core/application/ThingService.js'

const Server = HttpServer.HttpServer

export const THING_ID = process.env.THING_ID_1
export const THING_PORT = process.env.THING_PORT_1
export const THING_LOCATION = process.env.THING_LOCATION_1
export const KAFKA_BROKER = process.env.KAFKA_BROKER
if (THING_ID === undefined || THING_PORT === undefined || THING_LOCATION === undefined || KAFKA_BROKER === undefined) {
  console.log('Thing configuration not provided')
  process.exit(1)
}

export const thingService: ThingService = new ThingService(initialState)

const servient: Servient = new Servient()
servient.addServer(new Server({
  port: Number(THING_PORT),
  middleware: validation
}))

servient.start().then(async (WoT: any): Promise<void> => {
  const thing = await WoT.produce(td)

  thing.setPropertyReadHandler('status', statusHandler)
  thing.setActionHandler('toggle', toggleHandler)

  await thing.expose()
  console.log('Thing exposed successfully')
  await thingService.enable()
})
