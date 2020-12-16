import { DomainEvent } from '../../../Shared/domain/DomainEvent';

export class CourseLikedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'course.liked';

  readonly userId: string;

  constructor({
    id,
    userId,
    eventId,
    occurredOn
  }: {
    id: string;
    userId: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super(CourseLikedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.userId = userId;
  }

  toPrimitive(): { userId: string } {
    const { userId } = this;
    return {
      userId
    };
  }

  static fromPrimitives(aggregateId: string, body: { userId: string }, eventId: string, occurredOn: Date): DomainEvent {
    return new CourseLikedDomainEvent({
      id: aggregateId,
      userId: body.userId,
      eventId,
      occurredOn
    });
  }
}
