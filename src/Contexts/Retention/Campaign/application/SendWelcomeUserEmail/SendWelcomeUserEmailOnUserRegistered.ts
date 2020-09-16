import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { UserRegisteredDomainEvent } from '../../domain/UserRegisteredDomainEvent';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import SendWelcomeUserEmail from './SendWelcomeUserEmail';
import { EmailAddress } from '../../domain/EmailAddress';

export default class SendWelcomeUserEmailOnUserRegistered implements DomainEventSubscriber<UserRegisteredDomainEvent> {
  constructor(private sendWelcomeUserEmail: SendWelcomeUserEmail) {}

  subscribedTo(): DomainEventClass[] {
    return [UserRegisteredDomainEvent];
  }

  async on(domainEvent: UserRegisteredDomainEvent): Promise<void> {
    const userEmailAddress = new EmailAddress(domainEvent.userEmailAddress);
    await this.sendWelcomeUserEmail.run(userEmailAddress);
  }
}
