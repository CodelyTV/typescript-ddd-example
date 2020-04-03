import { DomainEvent } from './DomainEvent';
import { DomainEventSubscriber } from './DomainEventSubscriber';

export interface EventBus {
  publish(events: Array<DomainEvent>): Promise<void>;
  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void;
}
