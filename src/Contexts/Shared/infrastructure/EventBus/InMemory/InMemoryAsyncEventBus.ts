import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { EventBus } from '../../../domain/EventBus';
import { DomainEventMapping } from '../DomainEventMapping';
import { EventEmitterBus } from '../EventEmitterBus';

export class InMemoryAsyncEventBus implements EventBus {
  private bus: EventEmitterBus;

  constructor() {
    this.bus = new EventEmitterBus([]);
  }

  async start(): Promise<void> {}

  async publish(events: DomainEvent[]): Promise<void> {
    this.bus.publish(events);
  }

  async stop(): Promise<void> {}

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus.registerSubscribers(subscribers);
  }

  setDomainEventMapping(domainEventMapping: DomainEventMapping): void {}
}
