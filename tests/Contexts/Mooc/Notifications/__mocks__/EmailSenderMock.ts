import { EmailSender } from '../../../../../src/Contexts/Mooc/Notifications/domain/EmailSender';
import { Email } from '../../../../../src/Contexts/Mooc/Notifications/domain/Email';

export class EmailSenderMock implements EmailSender {
  private sendSpy = jest.fn();

  async send(email: Email): Promise<void> {
    this.sendSpy(email);
  }

  assertSentTimes(times: number): void {
    expect(this.sendSpy.mock.calls.length).toBe(times);
  }

  lastEmailSent(): Email {
    const sendCalls = this.sendSpy.mock.calls;
    const lastSendCall = sendCalls[sendCalls.length - 1] || [];
    const lastEmailSent = lastSendCall[0] as Email;

    return lastEmailSent;
  }
}
