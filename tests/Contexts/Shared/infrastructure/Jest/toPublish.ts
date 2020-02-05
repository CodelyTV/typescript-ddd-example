import { DomainEvent } from '../../../../../src/Contexts/Shared/domain/DomainEvent';
expect.extend({
  toPublish(received: jest.SpyInstance, expectedEvent: DomainEvent) {
    const events = received.mock.calls[0][0] as Array<DomainEvent>;
    const { eventId, occurredOn, ...expected } = expectedEvent;

    const pass = events.some((event: DomainEvent) => {
      const { eventId, occurredOn, ...data2 } = event;
      return this.equals(expected, data2);
    });

    const message = pass
      ? () =>
          this.utils.matcherHint('toPublish', undefined, undefined) +
          '\n\n' +
          `Expected: not ${this.utils.printExpected(events)}\n` +
          `Received: ${this.utils.printReceived(events)}`
      : () => {
          const diffString = this.utils.diff(expected, events, {
            expand: this.expand
          });
          return (
            this.utils.matcherHint('toPublish', undefined, undefined) +
            '\n\n' +
            (diffString && diffString.includes('- Expect')
              ? `Difference:\n\n${diffString}`
              : `Expected: ${this.utils.printExpected(expected)}\n` + `Received: ${this.utils.printReceived(events)}`)
          );
        };
    return { actual: received, message, pass };
  }
});
