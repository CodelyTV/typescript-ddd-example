import { Email } from './Email';
import { EmailAddress } from './EmailAddress';

export class WelcomeUserEmail extends Email {
  constructor(to: EmailAddress) {
    super({
      from: new EmailAddress('welcome@foo.com'),
      to,
      subject: 'Welcome',
      body: 'Welcome to our platform'
    });
  }
}
