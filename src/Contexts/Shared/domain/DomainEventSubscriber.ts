import { DomainEvent } from './DomainEvent';

export interface DomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): Array<string>;

  on(domainEvent: T): Promise<void>;
}
