import { DomainEvent } from './DomainEvent';

export interface DomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): Array<any>;

  on(domainEvent: T): Promise<void>;
}
