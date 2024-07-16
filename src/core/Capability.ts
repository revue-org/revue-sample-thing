export enum CapabilityType {
  SENSOR = 'sensor',
  VIDEO = 'video'
}

export enum MeasureType {
  TEMPERATURE = 'temperature',
  HUMIDITY = 'humidity',
  PRESSURE = 'pressure'
}

export type Capability = SensoringCapability | VideoStreamingCapability

export type SensoringCapability = {
  type: CapabilityType.SENSOR
  capturingInterval: string
  measure: {
    type: MeasureType
    unit: string
  }
}

export type VideoStreamingCapability = {
  type: CapabilityType.VIDEO
  resolution: string
}

