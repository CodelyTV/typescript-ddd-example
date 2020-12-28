import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreateCourseDomainEventBody = {
  readonly duration: string;
  readonly name: string;
  readonly eventName: string;
  readonly id: string;
};

export class CourseCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'course.created';

  readonly duration: string;
  readonly name: string;

  constructor({
    id,
    name,
    duration,
    eventId,
    occurredOn
  }: {
    id: string;
    eventId?: string;
    duration: string;
    name: string;
    occurredOn?: Date;
  }) {
    super(CourseCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.duration = duration;
    this.name = name;
  }

  toPrimitive(): CreateCourseDomainEventBody {
    const { name, duration, aggregateId } = this;
    return {
      name,
      duration,
      eventName: CourseCreatedDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: CreateCourseDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new CourseCreatedDomainEvent({
      id: aggregateId,
      duration: body.duration,
      name: body.name,
      eventId,
      occurredOn
    });
  }
}
