import { Given } from 'cucumber';
import container from '../../../../../src/apps/mooc_backend/config/dependency-injection';
import { EventBus } from '../../../../../src/Contexts/Shared/domain/EventBus';
import { DomainEventJsonDeserializer } from '../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventJsonDeserializer';

const eventBus = container.get('Mooc.shared.EventBus') as EventBus;
const deserializer = container.get('Mooc.shared.EventBus.DomainEventJsonDeserializer') as DomainEventJsonDeserializer;

Given('I send an event to the event bus:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event);

  await eventBus.publish([domainEvent]);
});
