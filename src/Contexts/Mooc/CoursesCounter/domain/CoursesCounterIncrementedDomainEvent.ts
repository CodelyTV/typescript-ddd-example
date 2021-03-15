import { DomainEvent } from '../../../Shared/domain/DomainEvent';

export class CoursesCounterIncrementedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'courses_counter.incremented';
  readonly total: number;

  constructor(data: { aggregateId: string; total: number; eventId?: string; occurredOn?: Date }) {
    super(CoursesCounterIncrementedDomainEvent.EVENT_NAME, data.aggregateId, data.eventId, data.occurredOn);
    this.total = data.total;
  }

  toPrimitive(): Object {
    return {
      total: this.total,
      eventName: CoursesCounterIncrementedDomainEvent.EVENT_NAME
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: { total: number },
    eventId: string,
    occurredOn: Date
  ): CoursesCounterIncrementedDomainEvent {
    return new CoursesCounterIncrementedDomainEvent({
      aggregateId,
      total: body.total,
      eventId,
      occurredOn
    });
  }
}
