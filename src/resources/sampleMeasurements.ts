import { v4 as uuidv4 } from 'uuid'
import { MeasureType, MeasureUnit } from '@/core/domain/Capability.js'
import node_dht from 'node-dht-sensor'
import { DHT_SENSOR_PIN } from '@/index.js'

const { read } = node_dht

function getDHTMeasurment(): Promise<{ temp: number, hum: number }> {
  return new Promise((resolver, rejector) => {
    read(11, parseInt(DHT_SENSOR_PIN!!), function (err: any, temperature: any, humidity: any) {
      if (!err) {
        resolver({
          "temp": temperature,
          "hum": humidity
        });
      } else {
        console.error(err);
        resolver({
          "temp": "0.0",
          "hum": "0.0"
        })
      }
    });
  })
}

export const temperatureMeasurement = async () => {
  return await getDHTMeasurment().then(measurement => {
    return {
      id: { value: uuidv4() },
      timestamp: new Date(),
      type: 'measurement',
      sourceDeviceId: process.env.THING_ID!,
      measure: {
        type: MeasureType.TEMPERATURE,
        unit: MeasureUnit.CELSIUS
      },
      value: measurement.temp
    }
  })
}

export const humidityMeasurement = async () => {
  return await getDHTMeasurment().then(measurement => {
    return {
      id: { value: uuidv4() },
      timestamp: new Date(),
      type: 'measurement',
      sourceDeviceId: process.env.THING_ID!,
      measure: {
        type: MeasureType.HUMIDITY,
        unit: MeasureUnit.PERCENTAGE
      },
      value: measurement.hum
    }
  })
}

export const pressureMeasurement = () => {
  return {
    id: { value: uuidv4() },
    timestamp: new Date(),
    type: 'measurement',
    sourceDeviceId: process.env.THING_ID!,
    measure: {
      type: MeasureType.PRESSURE,
      unit: MeasureUnit.BAR
    },
    value: Math.floor(Math.random() * 10)
  }
}
