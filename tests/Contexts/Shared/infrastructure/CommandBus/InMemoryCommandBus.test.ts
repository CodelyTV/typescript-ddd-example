import { Command } from '../../../../../src/Contexts/Shared/domain/Command';
import { CommandHandler } from '../../../../../src/Contexts/Shared/domain/CommandHandler';
import { CommandHandlersInformation } from '../../../../../src/Contexts/Shared/infrastructure/CommandBus/CommandHandlersInformation';
import { InMemoryCommandBus } from '../../../../../src/Contexts/Shared/infrastructure/CommandBus/InMemoryCommandBus';
import { NoHandlerForMessageError } from '../../../../../src/Contexts/Shared/infrastructure/CommandBus/NoHandlerForMessageError';

class UnhandledCommand extends Command {
  static COMMAND_NAME = 'unhandled.command';
}

class HandledCommand extends Command {
  static COMMAND_NAME = 'handled.command';
}

class MyCommandHandler implements CommandHandler<HandledCommand> {
  subscribedTo(): HandledCommand {
    return HandledCommand;
  }

  handle(command: HandledCommand): void {}
}

describe('InMemoryCommandBus', () => {
  it('throws an error if dispatches a command without handler', done => {
    const unhandledCommand = new UnhandledCommand();
    const commandHandlersInformation = new CommandHandlersInformation([]);
    const commandBus = new InMemoryCommandBus(commandHandlersInformation);

    try {
      commandBus.dispatch(unhandledCommand);
    } catch (error) {
      expect(error).toBeInstanceOf(NoHandlerForMessageError);
      expect(error.message).toBe('There is not handler for command of type UnhandledCommand');
      done();
    }
  });

  it('accepts a command with handler', done => {
    const handledCommand = new HandledCommand();
    const myCommandHandler = new MyCommandHandler();
    const commandHandlersInformation = new CommandHandlersInformation([myCommandHandler]);
    const commandBus = new InMemoryCommandBus(commandHandlersInformation);

    try {
      commandBus.dispatch(handledCommand);
      done();
    } catch (error) {}
  });
});
