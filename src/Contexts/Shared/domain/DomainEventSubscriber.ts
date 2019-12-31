import { DomainEvent } from './DomainEvent';

export interface DomainEventSubscriber<T extends DomainEvent> {
  subscribeTo(): Array<string>;

  on(domainEvent: T): void;
}
