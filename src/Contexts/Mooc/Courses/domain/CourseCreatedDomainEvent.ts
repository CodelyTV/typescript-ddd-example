import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreateCourseDomainEventBody = {
  readonly duration: string;
  readonly name: string;
  readonly description: string;
};

export class CourseCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'course.created';

  readonly duration: string;
  readonly name: string;
  readonly description: string;

  constructor({
    id,
    name,
    duration,
    description,
    eventId,
    occurredOn
  }: {
    id: string;
    eventId?: string;
    duration: string;
    name: string;
    description: string;
    occurredOn?: Date;
  }) {
    super(CourseCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.duration = duration;
    this.name = name;
    this.description = description;
  }

  toPrimitive(): CreateCourseDomainEventBody {
    const { name, duration, description } = this;
    return {
      name,
      duration,
      description
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
      description: body.description,
      eventId,
      occurredOn
    });
  }
}
