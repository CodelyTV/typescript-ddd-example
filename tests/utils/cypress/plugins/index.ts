import backendBackofficecontainer from '../../../../src/apps/backoffice/backend/config/dependency-injection';
import { registerSubscribers } from '../../../../src/apps/backoffice/backend/subscribers';
import { seed } from '../../../../src/apps/backoffice/frontend/seed';
import moocContainer from '../../../../src/apps/mooc/backend/config/dependency-injection';
import { EventBus } from '../../../../src/Contexts/Shared/domain/EventBus';
import { DomainEventJsonDeserializer } from '../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventJsonDeserializer';
import { EnvironmentArranger } from '../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';

const moocEnvironmentArranger: Promise<EnvironmentArranger> = moocContainer.get('Mooc.EnvironmentArranger');
const BackofficeBackendEnvironmentArranger: Promise<EnvironmentArranger> = backendBackofficecontainer.get(
  'Backoffice.Backend.EnvironmentArranger'
);

const eventBus = backendBackofficecontainer.get('Shared.EventBus') as EventBus;
const deserializer = backendBackofficecontainer.get(
  'Shared.EventBus.DomainEventJsonDeserializer'
) as DomainEventJsonDeserializer;
registerSubscribers();

export default (on: Cypress.PluginEvents, config: Cypress.PluginConfig) => {
  on('task', {
    async 'reset:mooc:db'() {
      await (await moocEnvironmentArranger).arrange();
      await seed();
      return null;
    },

    async 'reset:backoffice:db'() {
      await (await BackofficeBackendEnvironmentArranger).arrange();
      await seed();
      return null;
    },

    async 'publish:course:created'(event) {
      const domainEvent = deserializer.deserialize(event);
      await eventBus.publish([domainEvent]);
      return null;
    }
  });
};
