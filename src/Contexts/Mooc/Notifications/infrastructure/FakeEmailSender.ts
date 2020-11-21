import { EmailSender } from '../domain/EmailSender';
import { Email } from '../domain/Email';

export default class FakeEmailSender implements EmailSender {
  async send(email: Email): Promise<void> {
    // do nothing
  }
}
