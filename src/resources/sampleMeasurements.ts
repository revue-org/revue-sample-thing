import { v4 as uuidv4 } from 'uuid'
import { MeasureType, MeasureUnit } from '@/core/domain/Capability.js'

export const temperatureMeasurement = {
  id: { value: uuidv4() },
  timestamp: new Date(),
  type: 'measurement',
  sourceDeviceId: process.env.THING_ID_1!,
  measure: {
    type: MeasureType.TEMPERATURE,
    unit: MeasureUnit.CELSIUS
  },
  value: Math.floor(Math.random() * 30)
}

export const humidityMeasurement = {
  id: { value: uuidv4() },
  timestamp: new Date(),
  type: 'measurement',
  sourceDeviceId: process.env.THING_ID_1!,
  measure: {
    type: MeasureType.HUMIDITY,
    unit: MeasureUnit.PERCENTAGE
  },
  value: Math.floor(Math.random() * 100)
}

export const pressureMeasurement = {
  id: { value: uuidv4() },
  timestamp: new Date(),
  type: 'measurement',
  sourceDeviceId: process.env.THING_ID_1!,
  measure: {
    type: MeasureType.PRESSURE,
    unit: MeasureUnit.BAR
  },
  value: Math.floor(Math.random() * 10)
}