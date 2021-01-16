import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type UserRegisteredDomainEventBody = { userEmailAddress: string };

export class UserRegisteredDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.registered';
  readonly userEmailAddress: string;

  constructor(data: { id: string; userEmailAddress: string; eventId?: string; occurredOn?: Date }) {
    const { id, eventId, occurredOn, userEmailAddress } = data;
    super(UserRegisteredDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.userEmailAddress = userEmailAddress;
  }

  toPrimitive(): Object {
    return { userEmailAddress: this.userEmailAddress, eventName: UserRegisteredDomainEvent.EVENT_NAME };
  }

  static fromPrimitives(
    aggregateId: string,
    body: UserRegisteredDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new UserRegisteredDomainEvent({
      id: aggregateId,
      userEmailAddress: body.userEmailAddress,
      eventId,
      occurredOn
    });
  }
}
