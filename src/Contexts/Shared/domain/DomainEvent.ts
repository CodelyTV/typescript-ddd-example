export abstract class DomainEvent {
  readonly id: string;
  readonly eventId: string;
  readonly occurredOn: Date;

  constructor({ id }: { id: string }) {
    this.id = id;
    this.eventId = '';
    this.occurredOn = new Date();
  }

  abstract get eventName(): string;

  abstract toPrimitive(): Object;

  abstract fromPrimitive(): Object;
}
