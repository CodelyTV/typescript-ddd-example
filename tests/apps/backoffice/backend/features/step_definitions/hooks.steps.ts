import { AfterAll, BeforeAll } from 'cucumber';
import { BackofficeBackendApp } from '../../../../../../src/apps/backoffice/backend/BackofficeBackendApp';
import { ConfigureRabbitMQCommand } from '../../../../../../src/apps/backoffice/backend/command/ConfigureRabbitMQCommand';
import container from '../../../../../../src/apps/backoffice/backend/dependency-injection';
import { EventBus } from '../../../../../../src/Contexts/Shared/domain/EventBus';
import { EnvironmentArranger } from '../../../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';

let application: BackofficeBackendApp;
let environmentArranger: EnvironmentArranger;
let eventBus: EventBus;

BeforeAll(async () => {
  await ConfigureRabbitMQCommand.run();

  environmentArranger = await container.get<Promise<EnvironmentArranger>>('Backoffice.EnvironmentArranger');
  eventBus = container.get<EventBus>('Backoffice.Shared.domain.EventBus');
  await environmentArranger.arrange();

  application = new BackofficeBackendApp();
  await application.start();
});

AfterAll(async () => {
  await environmentArranger.arrange();
  await environmentArranger.close();

  await application.stop();
});

export { application, environmentArranger, eventBus };
