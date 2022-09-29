import { AfterAll, BeforeAll } from 'cucumber';
import { ConfigureRabbitMQCommand } from '../../../../../../src/apps/mooc/backend/command/ConfigureRabbitMQCommand';
import container from '../../../../../../src/apps/mooc/backend/dependency-injection';
import { MoocBackendApp } from '../../../../../../src/apps/mooc/backend/MoocBackendApp';
import { EventBus } from '../../../../../../src/Contexts/Shared/domain/EventBus';
import { EnvironmentArranger } from '../../../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';

let application: MoocBackendApp;
let environmentArranger: EnvironmentArranger;
let eventBus: EventBus;

BeforeAll(async () => {
  await ConfigureRabbitMQCommand.run();

  environmentArranger = await container.get<Promise<EnvironmentArranger>>('Mooc.EnvironmentArranger');
  eventBus = container.get<EventBus>('Mooc.Shared.domain.EventBus');
  await environmentArranger.arrange();

  application = new MoocBackendApp();
  await application.start();
});

AfterAll(async () => {
  await environmentArranger.close();

  await application.stop();
});

export { application, environmentArranger, eventBus };
