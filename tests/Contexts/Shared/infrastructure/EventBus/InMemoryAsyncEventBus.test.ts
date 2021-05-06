import { Uuid } from '../../../../../src/Contexts/Shared/domain/value-object/Uuid';
import { DomainEventMapping } from '../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventMapping';
import { InMemoryAsyncEventBus } from '../../../../../src/Contexts/Shared/infrastructure/EventBus/InMemory/InMemoryAsyncEventBus';
import { DummyEvent } from './doubles/DummyEvent';
import { SpyEventSubscriber } from './doubles/SpyEventSubscriber';

describe('InMemoryAsyncEventBus', () => {
  const subscriberSpy = new SpyEventSubscriber(DummyEvent);
  const eventBus = new InMemoryAsyncEventBus();

  beforeAll(() => {
    eventBus.addSubscribers([subscriberSpy]);
    const domainEventMapping = new DomainEventMapping([subscriberSpy]);
    eventBus.setDomainEventMapping(domainEventMapping);
  });

  it('publish and consume domain events', async () => {
    const event = new DummyEvent(Uuid.random().value);

    await eventBus.publish([event]);
    await eventBus.start();

    expect(subscriberSpy.numberOfReceivedEvents()).toEqual(1);
  });
});
