import { InMemoryCommandBus } from '../../../../../src/Contexts/Shared/infrastructure/CommandBus/InMemoryCommandBus';
import { Command } from '../../../../../src/Contexts/Shared/domain/Command';
import { NoHandlerForMessageError } from '../../../../../src/Contexts/Shared/infrastructure/CommandBus/NoHandlerForMessageError';

class UnhandledCommand extends Command {
  constructor() {
    super('UnhandledCommandName');
  }
}

describe('InMemoryCommandBus', () => {
  it('throws an error if dispatches a command without handler', (done) => {
    const unhandledCommand = new UnhandledCommand();
    const commandBus = new InMemoryCommandBus();

    try {
      commandBus.dispatch(unhandledCommand);
    } catch (error) {
      expect(error).toBeInstanceOf(NoHandlerForMessageError);
      expect(error.message).toBe('There is not handler for command of type UnhandledCommandName');
      done();
    }
  });
});
