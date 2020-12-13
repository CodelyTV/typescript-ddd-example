import { Given } from 'cucumber';
import container from '../../../../../../src/apps/backoffice/backend/config/dependency-injection';
import { EventBus } from '../../../../../../src/Contexts/Shared/domain/EventBus';
import { DomainEventJsonDeserializer } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventJsonDeserializer';

const eventBus = container.get('Shared.EventBus') as EventBus;
const deserializer = container.get('Shared.EventBus.DomainEventJsonDeserializer') as DomainEventJsonDeserializer;

Given('the following event is received:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event);
  await eventBus.publish([domainEvent]);
});
