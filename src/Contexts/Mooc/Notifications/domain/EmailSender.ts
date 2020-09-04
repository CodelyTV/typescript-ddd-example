import { Email } from './Email';

export interface EmailSender {
  send(email: Email): Promise<void>;
}
