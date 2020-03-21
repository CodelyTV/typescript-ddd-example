import { DomainEvent } from '../../../Shared/domain/DomainEvent';

export abstract class AggregateRoot {
  private domainEvents: Array<DomainEvent>;

  constructor() {
    this.domainEvents = [];
  }

  pullDomainEvents(): Array<DomainEvent> {
    return this.domainEvents;
  }

  record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  abstract toPrimitives(): any;
}
