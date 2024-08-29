import { RabbitMQConnection } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConnection';
import { RabbitMQConnectionDouble } from '../__mocks__/RabbitMQConnectionDouble';
import { RabbitMQConnectionConfigurationMother } from './RabbitMQConnectionConfigurationMother';

export class RabbitMQConnectionMother {
  static async create() {
    const config = RabbitMQConnectionConfigurationMother.create();
    const connection = new RabbitMQConnection(config);
    await connection.connect();
    return connection;
  }

  static failOnPublish() {
    return new RabbitMQConnectionDouble(RabbitMQConnectionConfigurationMother.create());
  }
}
