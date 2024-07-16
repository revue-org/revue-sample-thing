import { v4 as uuidv4 } from 'uuid'
import { thingService } from '@/index.js'
import { MeasureType, MeasureUnit } from '@/core/domain/Capability.js'

export const measurement = {
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