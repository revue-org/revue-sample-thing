import { Servient } from '@node-wot/core'
import HttpServer from '@node-wot/binding-http'
import KafkaProducer from '@/KafkaProducer.js'
import { td } from './thing-descriptor.js'
import { toggleHandler } from '@/handler/actions/toggle'
import { statusHandler } from '@/handler/properties/status'

const Server = HttpServer.HttpServer

const THING_ID = process.env.THING_ID_1
const THING_PORT = process.env.THING_PORT_1
const THING_LOCATION = process.env.THING_LOCATION_1
const KAFKA_BROKER = process.env.KAFKA_BROKER
if (THING_ID === undefined || THING_PORT === undefined || THING_LOCATION === undefined || KAFKA_BROKER === undefined) {
  console.log('Thing configuration not provided')
  process.exit(1)
}

export const producer: KafkaProducer = new KafkaProducer(THING_ID, [KAFKA_BROKER])

const httpServer = new Server({
  port: Number(THING_PORT)
})

const servient: Servient = new Servient()
servient.addServer(httpServer)

servient.start().then(async (WoT: any): Promise<void> => {
  const thing = await WoT.produce(td)

  thing.setPropertyReadHandler('status', statusHandler)
  thing.setActionHandler('toggle', toggleHandler)

  await thing.expose()
  console.log('Thing exposed successfully')
})
