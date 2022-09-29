import { CommandNotRegisteredError } from '../../../../../src/Contexts/Shared/domain/CommandNotRegisteredError';
import { CommandHandlers } from '../../../../../src/Contexts/Shared/infrastructure/CommandBus/CommandHandlers';
import { InMemoryCommandBus } from '../../../../../src/Contexts/Shared/infrastructure/CommandBus/InMemoryCommandBus';
import { CommandHandlerDummy } from './__mocks__/CommandHandlerDummy';
import { DummyCommand } from './__mocks__/DummyCommand';
import { UnhandledCommand } from './__mocks__/UnhandledCommand';

describe('InMemoryCommandBus', () => {
  it('throws an error if dispatches a command without handler', async () => {
    const unhandledCommand = new UnhandledCommand();
    const commandHandlers = new CommandHandlers([]);
    const commandBus = new InMemoryCommandBus(commandHandlers);

    await expect(commandBus.dispatch(unhandledCommand)).rejects.toBeInstanceOf(CommandNotRegisteredError);
  });

  it('accepts a command with handler', async () => {
    const dummyCommand = new DummyCommand();
    const commandHandlerDummy = new CommandHandlerDummy();
    const commandHandlers = new CommandHandlers([commandHandlerDummy]);
    const commandBus = new InMemoryCommandBus(commandHandlers);

    await commandBus.dispatch(dummyCommand);
  });
});
