import { RabbitMqConnection } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';

export class RabbitMQConnectionDouble extends RabbitMqConnection {

  async publish(params: any): Promise<boolean> {
    throw new Error();
  }
}
