import { DomainEventDeserializer } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventDeserializer';
import { DomainEventSubscribers } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { DomainEventSubscriberDummy } from '../__mocks__/DomainEventSubscriberDummy';

export class DomainEventDeserializerMother {
  static create() {
    const dummySubscriber = new DomainEventSubscriberDummy();
    const subscribers = new DomainEventSubscribers([dummySubscriber]);
    return DomainEventDeserializer.configure(subscribers);
  }
}
