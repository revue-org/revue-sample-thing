import { config } from 'dotenv'
import { Servient } from '@node-wot/core'
import HttpServer from '@node-wot/binding-http'
import { td } from '@/thing-descriptor.js'
import { validateToken } from './middleware.js'
const Server = HttpServer.HttpServer

const THING_ID = process.env.THING_ID_1
const THING_PORT = process.env.THING_PORT_1
if (THING_ID === undefined || THING_PORT === undefined) {
  console.log('Thing configuration not provided')
  process.exit(1)
}

const httpServer = new Server({
  port: Number(THING_PORT),
  middleware: validateToken,
  security: [{
    scheme: 'bearer'
  }]
})

const servient: Servient = new Servient()
servient.addServer(httpServer)

servient.start().then(async (WoT: any): Promise<void> => {
  const thing = await WoT.produce(td)

  thing.setPropertyReadHandler('status', () => {
    console.log(thing.id)
    return { id: thing.id, location: 'unknown', capabilities: [] }
  })
  thing.setActionHandler('toggle', () => {
    return 'toggled'
  })
  thing.setActionHandler('updateLocation', async (params: any) => {
    return 'location updated to ' + params.location
  })
  await thing.expose()
  console.log(thing.id)
  console.log('Thing exposed successfully')
  // now you can get the thing descriptor via http://localhost:8080/device-thing-sensor-1
})