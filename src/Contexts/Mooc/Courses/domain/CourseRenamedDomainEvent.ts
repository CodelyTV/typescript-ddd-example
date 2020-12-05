import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CourseRenamedDomainEventBody = {
  readonly oldName: string;
  readonly newName: string;
};

export class CourseRenamedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'course.renamed';

  readonly oldName: string;
  readonly newName: string;

  constructor({
    id,
    oldName,
    newName,
    eventId,
    occurredOn
  }: {
    id: string;
    eventId?: string;
    oldName: string;
    newName: string;
    occurredOn?: Date;
  }) {
    super(CourseRenamedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.oldName = oldName;
    this.newName = newName;
  }

  toPrimitive(): CourseRenamedDomainEventBody {
    const { newName: oldName, oldName: newName } = this;
    return {
      oldName,
      newName
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: CourseRenamedDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new CourseRenamedDomainEvent({
      id: aggregateId,
      oldName: body.oldName,
      newName: body.newName,
      eventId,
      occurredOn
    });
  }
}
