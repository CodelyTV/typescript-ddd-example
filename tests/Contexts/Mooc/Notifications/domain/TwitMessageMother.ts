import { WordMother } from '../../../Shared/domain/WordMother';
import { TwitMessage } from "../../../../../src/Contexts/Mooc/Notifications/domain/TwitMessage";

export class TwitMessageMother {
  static create(value: string): TwitMessage {
    return new TwitMessage(value);
  }

  static random(): TwitMessage {
    return this.create(WordMother.random());
  }
}
