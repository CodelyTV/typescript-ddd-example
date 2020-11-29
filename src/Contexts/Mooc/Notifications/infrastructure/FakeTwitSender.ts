import { Twit } from "../domain/Twit";
import { TwitSender } from "../domain/TwitSender";

export default class FakeTwitSender implements TwitSender {
  async send(twit: Twit): Promise<void> {
    // do nothing
  }
}
