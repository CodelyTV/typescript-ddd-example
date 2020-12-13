import { EmailAddress } from './EmailAddress';
import { EmailId } from './EmailId';
import { Uuid } from '../../../Shared/domain/value-object/Uuid';

type ConstructorParams = {
  id?: EmailId;
  from: EmailAddress;
  to: EmailAddress;
  subject: string;
  body: string;
};

export class Email {
  readonly id: EmailId;
  readonly from: EmailAddress;
  readonly to: EmailAddress;
  readonly subject: string;
  readonly body: string;

  constructor(params: ConstructorParams) {
    this.id = params.id || new EmailId(Uuid.random().value);
    this.from = params.from;
    this.to = params.to;
    this.subject = params.subject;
    this.body = params.body;
  }

  equals(otherEmail: Email): boolean {
    return (
      this.id.value === otherEmail.id.value &&
      this.from.value === otherEmail.from.value &&
      this.to.value === otherEmail.to.value &&
      this.subject === otherEmail.subject &&
      this.body === otherEmail.body
    );
  }
}
