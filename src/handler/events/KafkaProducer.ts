import { Kafka, logLevel, Partitioners, Producer } from 'kafkajs'

export default class KafkaProducer {
  private readonly producer: Producer

  constructor(id: string, brokers: string[]) {
    const kafka: Kafka = new Kafka({
      clientId: id,
      brokers: brokers,
      logLevel: logLevel.INFO
    })

    this.producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })

    this.producer.connect().then((): void => {
      console.log('Producer connected')
    }).catch((error): void => {
      console.log('Error connecting the producer: ', error)
      setTimeout((): void => {
        this.constructor(id, brokers)
      }, 5000)
    })
  }

  public produce(topic: string, message: object): void {
    this.producer
      .send({
        topic: topic,
        messages: [{ value: JSON.stringify(message) }]
      })
      .catch((err): void => {
        console.log('Error producing message: ', err)
      })
  }

  public async pause(): Promise<void> {
    await this.producer.disconnect()
  }

  public async resume(): Promise<void> {
    await this.producer.connect()
  }
}
