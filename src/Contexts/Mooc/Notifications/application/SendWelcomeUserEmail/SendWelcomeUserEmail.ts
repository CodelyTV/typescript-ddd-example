import { EmailSender } from '../../domain/EmailSender';
import { EmailAddress } from '../../domain/EmailAddress';
import { WelcomeUserEmail } from '../../domain/WelcomeUserEmail';
import { WelcomeUserEmailError } from '../../domain/WelcomeUserEmailError';

export default class SendWelcomeUserEmail {
  constructor(private emailSender: EmailSender) {}

  async run(userEmailAddress: EmailAddress): Promise<void> {
    const welcomeUserEmail = new WelcomeUserEmail(userEmailAddress);
    try {
      await this.emailSender.send(welcomeUserEmail);
    } catch (error) {
      throw new WelcomeUserEmailError(userEmailAddress);
    }
  }
}
