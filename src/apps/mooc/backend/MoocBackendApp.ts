import { EventBus } from '../../../Contexts/Shared/domain/EventBus';
import container from './dependency-injection';
import { DomainEventSubscribers } from '../../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { Server } from './server';
import { RabbitMQConnection } from '../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConnection';

export class MoocBackendApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5001';
    this.server = new Server(port);

    await this.configureEventBus();

    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    const RabbitMQConnection = container.get<RabbitMQConnection>('Mooc.Shared.RabbitMQConnection');
    await RabbitMQConnection.close();
    return this.server?.stop();
  }

  private async configureEventBus() {
    const eventBus = container.get<EventBus>('Mooc.Shared.domain.EventBus');
    const RabbitMQConnection = container.get<RabbitMQConnection>('Mooc.Shared.RabbitMQConnection');
    await RabbitMQConnection.connect();

    eventBus.addSubscribers(DomainEventSubscribers.from(container));
  }
}
