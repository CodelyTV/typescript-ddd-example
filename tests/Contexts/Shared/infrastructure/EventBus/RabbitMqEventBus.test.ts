import { Uuid } from '../../../../../src/Contexts/Shared/domain/value-object/Uuid';
import { DomainEventMapping } from '../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventMapping';
import RabbitMqEventbus from '../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMqEventBus';
import { RabbitMqConfigFactory } from '../../../../../src/Contexts/Mooc/Shared/infrastructure/EventBus/RabbitMq/RabbitMqConfigFactory';
import Logger from '../../../../../src/Contexts/Shared/infrastructure/WinstonLogger';
import { DummyEvent } from './doubles/DummyEvent';
import { SpyEventSubscriber } from './doubles/SpyEventSubscriber';

describe('RabbitMqEventBus', () => {
  const eventBus = new RabbitMqEventbus(RabbitMqConfigFactory.createConfig(), new Logger());
  const subscriberSpy = new SpyEventSubscriber(DummyEvent);

  beforeAll(() => {
    eventBus.addSubscribers([subscriberSpy]);
    const domainEventMapping = new DomainEventMapping([subscriberSpy]);
    eventBus.setDomainEventMapping(domainEventMapping);
  });

  afterAll(async () => {
    await eventBus.stop();
  });

  it('publish and consume domain events', async () => {
    const event = new DummyEvent(Uuid.random().value);

    await eventBus.start();
    await eventBus.publish([event]);

    await waitUntil(() => subscriberSpy.numberOfReceivedEvents() === 1);
  });
});

async function waitUntil(condition: Function): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeWas = new Date();
    const timeoutMs = 5000;
    const wait = setInterval(() => {
      if (condition()) {
        clearInterval(wait);
        return resolve();
      } else if (Number(new Date()) - Number(timeWas) > timeoutMs) {
        clearInterval(wait);
        return reject('Event was not consumed');
      }
    }, 20);
  });
}
