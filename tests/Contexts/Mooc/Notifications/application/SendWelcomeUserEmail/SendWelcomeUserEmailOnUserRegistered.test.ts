import faker from 'faker';
import { Email } from '../../../../../../src/Contexts/Mooc/Notifications/domain/Email';
import { EmailAddress } from '../../../../../../src/Contexts/Mooc/Notifications/domain/EmailAddress';
import { EmailSender } from '../../../../../../src/Contexts/Mooc/Notifications/domain/EmailSender';
import { EmailSenderMock } from '../../__mocks__/EmailSenderMock';
import SendWelcomeUserEmail from '../../../../../../src/Contexts/Mooc/Notifications/application/SendWelcomeUserEmail/SendWelcomeUserEmail';
import SendWelcomeUserEmailOnUserRegistered from '../../../../../../src/Contexts/Mooc/Notifications/application/SendWelcomeUserEmail/SendWelcomeUserEmailOnUserRegistered';
import { UserRegisteredDomainEvent } from '../../../../../../src/Contexts/Mooc/Notifications/domain/UserRegisteredDomainEvent';
import { UuidMother } from '../../../../../Contexts/Shared/domain/UuidMother';
import { WelcomeUserEmail } from '../../../../../../src/Contexts/Mooc/Notifications/domain/WelcomeUserEmail';
import { WelcomeUserEmailError } from '../../../../../../src/Contexts/Mooc/Notifications/domain/WelcomeUserEmailError';

describe('SendWelcomeUserEmailOnUserRegistered event handler', () => {
  it('sends a welcome email to the user', async () => {
    const emailSenderMock = new EmailSenderMock();
    const sendWelcomeUserEmail = new SendWelcomeUserEmail(emailSenderMock);
    const sendWelcomeUserEmailOnUserRegistered = new SendWelcomeUserEmailOnUserRegistered(sendWelcomeUserEmail);
    const userEmailAddress = anEmailAddress();
    const domainEvent = aDomainEventWithEmailAddress(userEmailAddress);

    await sendWelcomeUserEmailOnUserRegistered.on(domainEvent);

    const lastEmailSent = emailSenderMock.lastEmailSent();
    emailSenderMock.assertSentTimes(1);
    expect(lastEmailSent).toBeInstanceOf(WelcomeUserEmail);
    expect(lastEmailSent.to).toEqual(userEmailAddress);
  });

  it('throws a WelcomeUserEmailError if the emailSender fails', async () => {
    const failingEmailSender = aFailingEmailSender();
    const sendWelcomeUserEmail = new SendWelcomeUserEmail(failingEmailSender);
    const sendWelcomeUserEmailOnUserRegistered = new SendWelcomeUserEmailOnUserRegistered(sendWelcomeUserEmail);

    const domainEvent = aDomainEventWithEmailAddress(anEmailAddress());
    await expect(sendWelcomeUserEmailOnUserRegistered.on(domainEvent)).rejects.toBeInstanceOf(WelcomeUserEmailError);
  });
});

function aFailingEmailSender() {
  return {
    async send(email: Email) {
      throw new Error('some error');
    }
  } as EmailSender;
}

function anEmailAddress(): EmailAddress {
  return new EmailAddress(faker.internet.email());
}

function aDomainEventWithEmailAddress(emailAddress: EmailAddress) {
  return new UserRegisteredDomainEvent({
    id: UuidMother.random(),
    userEmailAddress: emailAddress.value
  });
}
