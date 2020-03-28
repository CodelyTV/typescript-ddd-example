import { Given } from 'cucumber';
import container from '../../../../../src/apps/mooc_backend/config/dependency-injection';
import { EventBus } from '../../../../../src/Contexts/Shared/domain/EventBus';

Given('I send an event to the event bus:', (event: any) => {
  const eventBus = container.get('Mooc.shared.EventBus') as EventBus;
  eventBus.publish([event]);
});
