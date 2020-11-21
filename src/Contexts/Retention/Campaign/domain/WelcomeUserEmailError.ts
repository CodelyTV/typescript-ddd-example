import { EmailAddress } from './EmailAddress';

export class WelcomeUserEmailError extends Error {
  constructor(userEmailAddress: EmailAddress) {
    super(`Error sending WelcomeUser email to ${userEmailAddress.value}`);
  }
}
