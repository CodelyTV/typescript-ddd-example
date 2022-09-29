import { Given } from 'cucumber';
import container from '../../../../../../src/apps/backoffice/backend/dependency-injection';
import { DomainEventDeserializer } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventDeserializer';
import { DomainEventSubscribers } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { eventBus } from './hooks.steps';

const deserializer = buildDeserializer();

Given('the following event is received:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event)!;

  await eventBus.publish([domainEvent]);
  await wait(500);
});

function buildDeserializer() {
  const subscribers = DomainEventSubscribers.from(container);
  return DomainEventDeserializer.configure(subscribers);
}

function wait(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
