import KafkaProducer from '@/handler/events/KafkaProducer.js'
import { thingService } from '@/index.js'
import { SensoringCapability } from '@/core/domain/Capability.js'
import { humidityMeasurement, pressureMeasurement, temperatureMeasurement } from '@/resources/sampleMeasurements.js'

class Simulation {
  private interval: any

  public start = (producer: KafkaProducer): void => {
    this.interval = setInterval(async (): Promise<void> => {
      producer.produce(`measurements.${thingService.getId()}`, temperatureMeasurement)
      producer.produce(`measurements.${thingService.getId()}`, humidityMeasurement)
      producer.produce(`measurements.${thingService.getId()}`, pressureMeasurement)
    }, (thingService.getState().capabilities[0] as SensoringCapability).capturingInterval)

    //produci il video
  }

  public stop = (): void => {
    clearInterval(this.interval)
    //ferma il video
  }
}

export const simulation: Simulation = new Simulation()
