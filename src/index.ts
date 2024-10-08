import { Servient } from '@node-wot/core'
import HttpServer from '@node-wot/binding-http'
import { td } from './thing-descriptor.js'
import { toggleHandler } from '@/handler/actions/toggle.js'
import { statusHandler } from '@/handler/properties/status.js'
import { validation } from '@/utils/middleware.js'
import { initialState } from '@/resources/initialState.js'
import { ThingService } from '@/core/application/ThingService.js'

const Server = HttpServer.HttpServer

export const THING_ID = process.env.THING_ID
export const THING_PORT = process.env.THING_PORT
export const THING_LOCATION = process.env.THING_LOCATION
export const MEDIA_SERVER_HOST = process.env.MEDIA_SERVER_HOST
export const MEDIA_SERVER_RTSP_PORT = process.env.MEDIA_SERVER_RTSP_PORT
if (
  THING_ID === undefined ||
  THING_PORT === undefined ||
  THING_LOCATION === undefined ||
  MEDIA_SERVER_HOST === undefined ||
  MEDIA_SERVER_RTSP_PORT === undefined
) {
  console.log('Thing configuration not provided')
  process.exit(1)
}

export const thingService: ThingService = new ThingService(initialState)

const servient: Servient = new Servient()
servient.addServer(
  new Server({
    port: Number(THING_PORT),
    middleware: validation
  })
)

servient.start().then(async (WoT: any): Promise<void> => {
  const thing = await WoT.produce(td)

  thing.setPropertyReadHandler('status', statusHandler)
  thing.setActionHandler('toggle', toggleHandler)

  await thing.expose()
  console.log('Thing exposed successfully')
  await thingService.enable()
})
