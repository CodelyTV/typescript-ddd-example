import uuid from 'uuid/v4';

export abstract class DomainEvent {
  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor(eventName: string, aggregateId: string, eventId?: string, occurredOn?: Date) {
    this.aggregateId = aggregateId;
    this.eventId = eventId || uuid();
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
  }

  abstract toPrimitive(): Object;
}
