import { TwitSender } from '../../../../../src/Contexts/Mooc/Notifications/domain/TwitSender';
import { Twit } from '../../../../../src/Contexts/Mooc/Notifications/domain/Twit';

export class TwitSenderMock implements TwitSender {
  private sendSpy = jest.fn();

  async send(twit: Twit): Promise<void> {
    this.sendSpy(twit);
  }

  assertSentTimes(times: number): void {
    expect(this.sendSpy.mock.calls.length).toBe(times);
  }

  lastTwitSent(): Twit {
    const sendCalls = this.sendSpy.mock.calls;
    const lastSendCall = sendCalls[sendCalls.length - 1] || [];
    const lastTwitSent = lastSendCall[0] as Twit;

    return lastTwitSent;
  }
}
