import backendBackofficecontainer from '../../../../src/apps/backoffice/backend/dependency-injection';
import { seed } from '../../../../src/apps/backoffice/frontend/seed';
import moocContainer from '../../../../src/apps/mooc/backend/dependency-injection';
import { EnvironmentArranger } from '../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';

const moocEnvironmentArranger: Promise<EnvironmentArranger> = moocContainer.get('Mooc.EnvironmentArranger');
const BackofficeBackendEnvironmentArranger: Promise<EnvironmentArranger> = backendBackofficecontainer.get(
  'Backoffice.Backend.EnvironmentArranger'
);

export default (on: Cypress.PluginEvents, config: Cypress.PluginConfig) => {
  on('task', {
    async 'reset:mooc:db'() {
      await (await moocEnvironmentArranger).arrange();
      await seed();
      return null;
    },

    async 'reset:backoffice:db'() {
      await (await BackofficeBackendEnvironmentArranger).arrange();
      return null;
    }
  });
};
