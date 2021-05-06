import { Uuid } from '../../../../../src/Contexts/Shared/domain/value-object/Uuid';
import { DomainEventMapping } from '../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventMapping';
import { InMemorySyncEventBus } from '../../../../../src/Contexts/Shared/infrastructure/EventBus/InMemory/InMemorySyncEventBus';
import { DummyEvent } from './doubles/DummyEvent';
import { SpyEventSubscriber } from './doubles/SpyEventSubscriber';

describe('InMemorySyncEventBus', () => {
  const subscriberSpy = new SpyEventSubscriber(DummyEvent);
  const eventBus = new InMemorySyncEventBus();

  beforeAll(() => {
    eventBus.addSubscribers([subscriberSpy]);
    const domainEventMapping = new DomainEventMapping([subscriberSpy]);
    eventBus.setDomainEventMapping(domainEventMapping);
  });

  it('publish and consume domain events', () => {
    const event = new DummyEvent(Uuid.random().value);

    eventBus.publish([event]);
    eventBus.start();

    expect(subscriberSpy.numberOfReceivedEvents()).toEqual(1);
  });
});
