import { EventBus } from '../../../../../src/Contexts/Shared/domain/EventBus';
import { DomainEvent } from '../../../../../src/Contexts/Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../../src/Contexts/Shared/domain/DomainEventSubscriber';
import { DomainEventMapping } from '../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventMapping';

export default class EventBusMock implements EventBus {
  private publishSpy = jest.fn();

  async publish(events: DomainEvent[]) {
    this.publishSpy(events);
  }

  async start(): Promise<void> {}

  addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void {}

  setDomainEventMapping(domainEventMapping: DomainEventMapping): void {}

  assertLastPublishedEventIs(expectedEvent: DomainEvent) {
    const publishSpyCalls = this.publishSpy.mock.calls;

    expect(publishSpyCalls.length).toBeGreaterThan(0);

    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1];
    const lastPublishedEvent = lastPublishSpyCall[0][0];

    expect(this.getDataFromDomainEvent(expectedEvent)).toMatchObject(this.getDataFromDomainEvent(lastPublishedEvent));
  }

  private getDataFromDomainEvent(event: DomainEvent) {
    const { eventId, occurredOn, ...attributes } = event;

    return attributes;
  }
}
