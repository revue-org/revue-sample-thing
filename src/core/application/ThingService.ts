import { State } from '@/core/domain/State.js'
import KafkaProducer from '@/handler/events/KafkaProducer.js'
import { getBrokersFromEnv, KafkaBroker } from '@/handler/events/KafkaOptions.js'
import { simulation } from '@/handler/events/Simulation.js'

export class ThingService {
  private readonly state: State
  private readonly producer: KafkaProducer

  constructor(state: State) {
    this.state = state
    const brokers: KafkaBroker[] = getBrokersFromEnv()
    console.log(brokers)
    this.producer = new KafkaProducer(state.id, brokers)
  }

  public getState(): State {
    return {
      ...this.state
    }
  }

  public getId(): string {
    return this.state.id
  }

  public isActive(): boolean {
    return this.state.enabled
  }

  public async enable(): Promise<void> {
    this.state.enabled = true
    await this.producer.resume()
    await simulation.start(this.producer)
  }

  public async disable(): Promise<void> {
    this.state.enabled = false
    await this.producer.pause()
    simulation.stop()
  }
}
