import { Given } from 'cucumber';
import { Definition } from 'node-dependency-injection';
import container from '../../../../../../src/apps/mooc/backend/dependency-injection';
import { DomainEvent } from '../../../../../../src/Contexts/Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../../../src/Contexts/Shared/domain/DomainEventSubscriber';
import { EventBus } from '../../../../../../src/Contexts/Shared/domain/EventBus';
import { DomainEventJsonDeserializer } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventJsonDeserializer';
import { DomainEventMapping } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventMapping';

const eventBus = container.get('Shared.EventBus') as EventBus;
const deserializer = buildDeserializer();

Given('I send an event to the event bus:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event);

  await eventBus.publish([domainEvent!]);
});

function buildDeserializer() {
  const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<String, Definition>;
  const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

  subscriberDefinitions.forEach((value: any, key: any) => subscribers.push(container.get(key)));
  const domainEventMapping = new DomainEventMapping(subscribers);

  return new DomainEventJsonDeserializer(domainEventMapping);
}
