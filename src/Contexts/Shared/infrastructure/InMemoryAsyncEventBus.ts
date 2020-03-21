import { DomainEvent } from '../domain/DomainEvent';
import { DomainEventSubscriber } from '../domain/DomainEventSubscriber';
import { EventBus } from '../domain/EventBus';
import { EventEmitterBus } from './EventEmitterBus';

export class InMemoryAsyncEventBus implements EventBus {
  private bus: EventEmitterBus;

  constructor(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus = new EventEmitterBus(subscribers);
  }

  publish(events: DomainEvent[]): void {
    this.bus.publish(events);
  }
}
