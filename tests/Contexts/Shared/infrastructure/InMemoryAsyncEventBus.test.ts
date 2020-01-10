import { InMemoryAsyncEventBus } from '../../../../src/Contexts/Shared/infrastructure/InMemoryAsyncEventBus';
import { DomainEventSubscriber } from '../../../../src/Contexts/Shared/domain/DomainEventSubscriber';
import { DomainEvent } from '../../../../src/Contexts/Shared/domain/DomainEvent';
import uuid = require('uuid');

describe('InMemoryAsyncEventBus', () => {
  let subscriber: DomainEventSubscriberDummy;
  let eventBus: InMemoryAsyncEventBus;

  beforeAll(() => {});

  it('the subscriber should be called when the event it is subscribed to is published', done => {
    const event = new DummyEvent(uuid());
    subscriber = new DomainEventSubscriberDummy();
    subscriber.on = () => {
      done();
    };

    eventBus = new InMemoryAsyncEventBus([subscriber]);

    eventBus.publish([event]);
  });
});

class DummyEvent extends DomainEvent {
  static EVENT_NAME = 'dummy:event';

  constructor(id: string) {
    super(DummyEvent.EVENT_NAME, id);
  }

  toPrimitive(): Object {
    throw new Error('Method not implemented.');
  }
}

class DomainEventSubscriberDummy implements DomainEventSubscriber<DummyEvent> {
  subscribedTo(): string[] {
    return [DummyEvent.EVENT_NAME];
  }

  on(domainEvent: DummyEvent): void {
    console.log(domainEvent);
  }
}
