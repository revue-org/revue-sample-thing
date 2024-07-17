export enum CapabilityType {
  SENSOR = 'sensor',
  VIDEO = 'video'
}

export enum MeasureType {
  TEMPERATURE = 'temperature',
  HUMIDITY = 'humidity',
  PRESSURE = 'pressure'
}

export enum MeasureUnit {
  CELSIUS = 'celsius',
  PERCENTAGE = 'percentage',
  BAR = 'bar'
}

export type Capability = SensoringCapability | VideoStreamingCapability

export type SensoringCapability = {
  type: CapabilityType.SENSOR
  capturingInterval: number
  measure: {
    type: MeasureType
    unit: string
  }
}

export type VideoStreamingCapability = {
  type: CapabilityType.VIDEO
  resolution: string
}

