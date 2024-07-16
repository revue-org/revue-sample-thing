import KafkaProducer from '@/handler/events/KafkaProducer.js'
import { thingService } from '@/index.js'
import { SensoringCapability } from '@/core/domain/Capability.js'
import { measurement } from '@/utils/sampleMeasurement.js'

class Simulation {
  private interval: any

  public start = (producer: KafkaProducer): void => {
    this.interval = setInterval(async (): Promise<void> => {
      producer.produce(`measurements.${thingService.getId()}`, measurement)
    }, (thingService.getState().capabilities[0] as SensoringCapability).capturingInterval)
  }

  public stop = (): void => {
    clearInterval(this.interval)
  }
}

export const simulation: Simulation = new Simulation()
