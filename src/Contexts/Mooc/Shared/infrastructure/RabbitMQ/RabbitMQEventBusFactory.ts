import { DomainEventFailoverPublisher } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher/DomainEventFailoverPublisher';
import { RabbitMqConnection } from '@/Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import { RabbitMQEventBus } from '@/Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQEventBus';
import { RabbitMQqueueFormatter } from '@/Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter';
import { RabbitMQConfig } from './RabbitMQConfigFactory';

export class RabbitMQEventBusFactory {
  static create(
    failoverPublisher: DomainEventFailoverPublisher,
    connection: RabbitMqConnection,
    queueNameFormatter: RabbitMQqueueFormatter,
    config: RabbitMQConfig
  ): RabbitMQEventBus {
    return new RabbitMQEventBus({
      failoverPublisher,
      connection,
      exchange: config.exchangeSettings.name,
      queueNameFormatter: queueNameFormatter,
      maxRetries: config.maxRetries
    });
  }
}
