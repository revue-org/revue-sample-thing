import { Servient } from '@node-wot/core'
import HttpServer from '@node-wot/binding-http'
import { validateToken } from './middleware.js'
import KafkaProducer from '@/KafkaProducer.js'
import { td } from './thing-descriptor.js'

const Server = HttpServer.HttpServer

const THING_ID = process.env.THING_ID_1
const THING_PORT = process.env.THING_PORT_1
const THING_LOCATION = process.env.THING_LOCATION_1
if (THING_ID === undefined || THING_PORT === undefined || THING_LOCATION === undefined) {
  console.log('Thing configuration not provided')
  process.exit(1)
}

const KAFKA_BROKER = process.env.KAFKA_BROKER
if (KAFKA_BROKER === undefined) {
  console.log('Kafka configuration not provided')
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
  const status = {
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

  const thing = await WoT.produce(td)
  const producer: KafkaProducer = new KafkaProducer(THING_ID, [KAFKA_BROKER])

  thing.setPropertyReadHandler('status', () => {
    console.log('Current status: ', status)
    return status
  })
  thing.setActionHandler('toggle', (): string => {
    status.enabled = !status.enabled
    if (status.enabled) {
      console.log('Device enabled')
      producer.resume()
    } else {
      console.log('Device disabled')
      producer.pause()
    }
    return status.enabled ? 'Device enabled' : 'Device disabled'
  })
  thing.setActionHandler('updateLocation', async (params: any) => {
    console.log('Updating location to ' + params.location)
    status.location = params.location
    return 'location updated to ' + params.location
  })
  await thing.expose()
  setInterval(async (): Promise<void> => {
    const measurement = {
      timestamp: new Date().toISOString(),
      deviceId: status.id,
      measure: {
        type: status.capabilities[0].measure.type,
        unit: status.capabilities[0].measure.unit,
        value: Math.floor(Math.random() * 30)
      }
    }
    producer.produce(`measurements.${status.id}`, measurement)
  }, status.capabilities[0].capturingInterval)
  console.log('Thing exposed successfully')
  // thing descriptor via http://localhost:8080/{{thing-id}}
})
