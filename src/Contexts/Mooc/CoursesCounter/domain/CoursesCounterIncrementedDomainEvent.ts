import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CoursesCounterIncrementedAttributes = { total: number };

export class CoursesCounterIncrementedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'courses_counter.incremented';
  readonly total: number;

  constructor(data: { aggregateId: string; total: number; eventId?: string; occurredOn?: Date }) {
    const { aggregateId, eventId, occurredOn } = data;
    super({ eventName: CoursesCounterIncrementedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.total = data.total;
  }

  toPrimitives() {
    return {
      total: this.total
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CoursesCounterIncrementedAttributes;
    eventId: string;
    occurredOn: Date;
  }) {
    const { aggregateId, attributes, eventId, occurredOn } = params;
    return new CoursesCounterIncrementedDomainEvent({
      aggregateId,
      total: attributes.total,
      eventId,
      occurredOn
    });
  }
}
