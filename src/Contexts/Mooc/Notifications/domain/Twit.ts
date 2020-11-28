import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { TwitId } from './TwitId';
import { TwitMessage } from './TwitMessage';

type ConstructorParams = {
  id?: TwitId;
  message: TwitMessage;
};

export class Twit {
  readonly message: TwitMessage;
  readonly id: TwitId;

  constructor(params: ConstructorParams) {
    this.id = params.id || new TwitId(Uuid.random().value);
    this.message = params.message;
  }

  equals(twit: Twit): boolean {
    return (
      this.id.value === twit.id.value &&
      this.message.value === twit.message.value
    );
  }
}
