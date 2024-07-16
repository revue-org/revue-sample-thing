export const toggleHandler = async (params: any): Promise<string> => {
  status.enabled = (await params.value()).enable
  if (status.enabled) {
    await producer.resume()
    console.log('Device toggled: enable')
  } else {
    await producer.pause()
    console.log('Device toggled: disable')
  }
  return status.enabled ? 'Device enabled' : 'Device disabled'
}

/*  setInterval(async (): Promise<void> => {
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