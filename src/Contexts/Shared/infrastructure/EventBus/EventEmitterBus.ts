import { DomainEvent } from '../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../domain/DomainEventSubscriber';
import { EventEmitter } from 'events';

export class EventEmitterBus extends EventEmitter {
  constructor(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    super();

    this.registerSubscribers(subscribers);
  }

  registerSubscribers(subscribers?: DomainEventSubscriber<DomainEvent>[]) {
    subscribers?.map(subscriber => {
      this.registerSubscriber(subscriber);
    });
  }

  private registerSubscriber(subscriber: DomainEventSubscriber<DomainEvent>) {
    subscriber.subscribedTo().map(event => {
      this.on(event, subscriber.on);
    });
  }

  publish(events: DomainEvent[]): void {
    events.map(event => this.emit(event.eventName, event));
  }
}
