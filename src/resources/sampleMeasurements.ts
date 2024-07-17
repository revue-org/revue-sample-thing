import { v4 as uuidv4 } from 'uuid'
import { thingService } from '@/index.js'
import { MeasureType, MeasureUnit } from '@/core/domain/Capability.js'

export const temperatureMeasurement = {
  id: { value: uuidv4() },
  timestamp: new Date(),
  type: 'measurement',
  sourceDeviceId: thingService.getId(),
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
  sourceDeviceId: thingService.getId(),
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
  sourceDeviceId: thingService.getId(),
  measure: {
    type: MeasureType.PRESSURE,
    unit: MeasureUnit.BAR
  },
  value: Math.floor(Math.random() * 10)
}