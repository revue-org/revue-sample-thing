import { config } from 'dotenv'

config({ path: process.cwd() + '/.env' })

const thingId = process.env.THING_ID_1

export const td = {
  context: [
    'https://www.w3.org/2022/wot/td/v1.1',
    {
      cred: 'https://www.w3.org/2018/credentials#',
      sec: 'https://w3id.org/security#'
    }
  ],
  id: 'urn:dev:wot:' + thingId,
  type: 'Device',
  title: 'device',
  description: 'Thing Descriptor for a Revue Device',
  securityDefinitions: {
    nosec_sc: {
      scheme: 'nosec'
    }
  },
  security: ['nosec_sc'],
  properties: {
    status: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        location: {
          type: 'string'
        },
        enabled: {
          type: 'boolean'
        },
        capabilities: {
          type: 'array',
          items: {
            type: 'object',
            scheme: {
              anyOf: [
                {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      enum: ['sensor']
                    },
                    capturingInterval: {
                      type: 'number'
                    },
                    measure: {
                      type: 'object',
                      properties: {
                        type: {
                          type: 'string',
                          enum: ['temperature', 'humidity', 'pressure']
                        },
                        unit: {
                          type: 'string',
                          enum: ['celsius', 'fahrenheit', 'percentage', 'pascal', 'bar']
                        }
                      }
                    }
                  }
                },
                {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      enum: ['camera']
                    },
                    resolution: {
                      type: 'string',
                      enum: ['576p', '720p', '1080p', '4k']
                    }
                  }
                }
              ]
            }
          }
        }
      },
      observable: true,
      readOnly: true,
      forms: [
        {
          contentType: 'application/json',
          op: ['readproperty']
        }
      ]
    }
  },
  actions: {
    toggle: {
      input: {
        type: 'object',
        properties: {
          enable: {
            type: 'boolean'
          }
        },
        required: ['enable']
      },
      output: {
        type: 'string'
      },
      forms: [
        {
          op: 'invokeaction',
          contentType: 'application/json'
        }
      ]
    }
  },
  events: {
    produce: {
      data: { type: 'object' },
      forms: [
        {
          href: 'kafka://broker.kafka.example.com:9092/measurements.' + thingId,
          subprotocol: 'kafka'
        }
      ]
    }
  }
}
