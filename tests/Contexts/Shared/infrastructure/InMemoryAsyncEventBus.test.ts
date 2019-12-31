import { InMemoryAsyncEventBus } from '../../../../src/Contexts/Shared/infrastructure/InMemoryAsyncEventBus';
import { DomainEventSubscriber } from '../../../../src/Contexts/Shared/domain/DomainEventSubscriber';
import { DomainEvent } from '../../../../src/Contexts/Shared/domain/DomainEvent';
import uuid = require('uuid');

describe('InMemoryAsyncEventBus', () => {
  let subscriber: DomainEventSubscriberDummy;
  let eventBus: InMemoryAsyncEventBus;

  beforeAll(() => {});

  it('', done => {
    const event = new DummyEvent({ id: uuid() });
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

  get eventName(): string {
    return DummyEvent.EVENT_NAME;
  }

  toPrimitive(): Object {
    throw new Error('Method not implemented.');
  }

  fromPrimitive(): Object {
    throw new Error('Method not implemented.');
  }
}

class DomainEventSubscriberDummy implements DomainEventSubscriber<DummyEvent> {
  subscribeTo(): string[] {
    return [DummyEvent.EVENT_NAME];
  }

  on(domainEvent: DummyEvent): void {
    console.log(domainEvent);
  }
}
