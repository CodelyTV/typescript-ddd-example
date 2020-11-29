import { Twit } from './Twit';

export interface TwitSender {
  send(twit: Twit): Promise<void>;
}
