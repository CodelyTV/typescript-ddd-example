import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreateCourseDomainEventBody = {
  readonly duration: number;
  readonly name: string;
};

export class CourseCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'course.created';

  readonly duration: number;
  readonly name: string;

  constructor({
    id,
    eventId,
    duration,
    name,
    occurredOn
  }: {
    id: string;
    eventId?: string;
    duration: number;
    name: string;
    occurredOn?: Date;
  }) {
    super(CourseCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.duration = duration;
    this.name = name;
  }

  toPrimitive(): CreateCourseDomainEventBody {
    const { name, duration } = this;
    return {
      name,
      duration
    };
  }

  static fromPrimitive(
    aggregateId: string,
    body: CreateCourseDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): CourseCreatedDomainEvent {
    return new CourseCreatedDomainEvent({
      id: aggregateId,
      duration: body.duration,
      name: body.name,
      eventId,
      occurredOn
    });
  }
}
