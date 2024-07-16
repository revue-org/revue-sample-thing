/*
import { v4 as uuidv4 } from 'uuid'
import { producer } from '@/index'

setInterval(async (): Promise<void> => {
  const measurement = {
    id: { value: uuidv4() },
    timestamp: new Date(),
    type: 'measurement',
    sourceDeviceId: status.id,
    measure: {
      type: status.capabilities[0].measure.type,
      unit: status.capabilities[0].measure.unit
    },
    value: Math.floor(Math.random() * 30)
  }
  if (status.enabled) {
    producer.produce(`measurements.${status.id}`, measurement)
  }
}, status.capabilities[0].capturingInterval)*/
