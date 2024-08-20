import { Given } from '@cucumber/cucumber';
import container from '@/apps/mooc/backend/dependency-injection';
import { DomainEventDeserializer } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventDeserializer';
import { DomainEventSubscribers } from '@/Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { eventBus } from './hooks.steps';

const deserializer = buildDeserializer();

Given('I send an event to the event bus:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event);

  await eventBus.publish([domainEvent!]);
  await wait(500);
});

function buildDeserializer() {
  const subscribers = DomainEventSubscribers.from(container);

  return DomainEventDeserializer.configure(subscribers);
}

function wait(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
