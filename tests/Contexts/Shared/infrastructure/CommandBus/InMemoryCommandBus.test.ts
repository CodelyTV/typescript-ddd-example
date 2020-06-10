import { InMemoryCommandBus } from '../../../../../src/Contexts/Shared/infrastructure/CommandBus/InMemoryCommandBus';
import { Command } from '../../../../../src/Contexts/Shared/domain/Command';
import { NoHandlerForMessageError } from '../../../../../src/Contexts/Shared/infrastructure/CommandBus/NoHandlerForMessageError';

class UnhandledCommand extends Command {
  static COMMAND_NAME = 'unhandled.command';
}

class HandledCommand extends Command {
  static COMMAND_NAME = 'handled.command';
}

interface CommandHandler {
  handle(command: Command): void;
}

class MyCommandHandler implements CommandHandler {
  handle(command: HandledCommand): void {}
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

  it('accepts a command with handler', done => {
    const handledCommand = new HandledCommand();
    const myCommandHandler = new MyCommandHandler();
    const commandBus = new InMemoryCommandBus([myCommandHandler]);

    try {
      commandBus.dispatch(handledCommand);
      done();
    } catch (error) { }
  });
});
