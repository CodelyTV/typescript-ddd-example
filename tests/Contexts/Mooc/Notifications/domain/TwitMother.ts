import { TwitIdMother } from "./TwitIdMother";
import { TwitId } from "../../../../../src/Contexts/Mooc/Notifications/domain/TwitId";
import { TwitMessage } from "../../../../../src/Contexts/Mooc/Notifications/domain/TwitMessage";
import { Twit } from "../../../../../src/Contexts/Mooc/Notifications/domain/Twit";
import { TwitMessageMother } from "./TwitMessageMother";

export class TwitMother {
  static create(id: TwitId, message: TwitMessage): Twit {
    return new Twit({id, message});
  }

  static random(): Twit {
    return this.create(TwitIdMother.random(), TwitMessageMother.random());
  }
}
