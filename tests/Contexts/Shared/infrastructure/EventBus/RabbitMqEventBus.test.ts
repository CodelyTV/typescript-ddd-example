import { Uuid } from '../../../../../src/Contexts/Shared/domain/value-object/Uuid';
import { DomainEventMapping } from '../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventMapping';
import RabbitMqConfig from '../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMqConfig';
import RabbitMqEventbus from '../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMqEventBus';
import Logger from '../../../../../src/Contexts/Shared/infrastructure/WinstonLogger';
import { DummyEvent } from './doubles/DummyEvent';
import { SpyEventSubscriber } from './doubles/SpyEventSubscriber';

describe('RabbitMqEventBus', () => {
  const eventBus = aRabbitMqEventBus();
  const subscriberSpy = new SpyEventSubscriber(DummyEvent);

  beforeAll(() => {
    eventBus.addSubscribers([subscriberSpy]);
    const domainEventMapping = new DomainEventMapping([subscriberSpy]);
    eventBus.setDomainEventMapping(domainEventMapping);
  });

  it('publish and consume domain events', async () => {
    const event = new DummyEvent(Uuid.random().value);

    await eventBus.publish([event]);
    await eventBus.start();

    await waitUntil(() => subscriberSpy.numberOfReceivedEvents() === 1);
  });
});

async function waitUntil(condition: Function): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeWas = new Date();
    const timeoutMs = 5000;
    const wait = setInterval(function () {
      if (condition()) {
        clearInterval(wait);
        return resolve();
      } else if (Number(new Date()) - Number(timeWas) > timeoutMs) {
        clearInterval(wait);
        return reject();
      }
    }, 20);
  });
}

function aRabbitMqEventBus() {
  const rabbitMqConfig: RabbitMqConfig = {
    host: 'localhost',
    user: 'guest',
    password: 'guest',
    queue: 'testQueue',
    exchange: 'testExchange'
  };

  return new RabbitMqEventbus(rabbitMqConfig, new Logger());
}
