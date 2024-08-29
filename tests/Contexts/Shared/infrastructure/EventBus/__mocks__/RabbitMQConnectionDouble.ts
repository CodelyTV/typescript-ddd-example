import { RabbitMQConnection } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConnection';

export class RabbitMQConnectionDouble extends RabbitMQConnection {

  async publish(params: any): Promise<boolean> {
    throw new Error();
  }
}
