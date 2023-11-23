import { AfterAll, BeforeAll } from '@cucumber/cucumber';
import { ConfigureRabbitMQCommand } from '@/apps/mooc/backend/command/ConfigureRabbitMQCommand';
import container from '@/apps/mooc/backend/dependency-injection';
import { MoocBackendApp } from '@/apps/mooc/backend/MoocBackendApp';
import { EventBus } from '@/Contexts/Shared/domain/EventBus';
import { EnvironmentArranger } from "@tests/Contexts/Shared/infrastructure/arranger/EnvironmentArranger";

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
