import { CommandBus } from './../../domain/CommandBus';
import { Command } from '../../domain/Command';
import { NoHandlerForMessageError } from './NoHandlerForMessageError';
import { CommandHandler } from '../../domain/CommandHandler';

export class CommandHandlersInformation {
  private commandHandlersMap: Map<string, CommandHandler<Command>>;

  constructor(commandHandlers: Array<CommandHandler<Command>>) {
    this.commandHandlersMap = this.formatHandlers(commandHandlers);
  }

  private formatHandlers(commandHandlers: Array<CommandHandler<Command>>) {
    const handlersMap = new Map();

    commandHandlers.forEach(commandHandler => {
      handlersMap.set(commandHandler.subscribedTo(), commandHandler);
    });

    return handlersMap;
  }

  public getHandler(command: Command) {
    return this.commandHandlersMap.get(command.constructor.name);
  }
}

export class InMemoryCommandBus implements CommandBus {
  constructor(private commandHandlersInformation: CommandHandlersInformation) {
  }

  dispatch(command: Command): void {
    const handler = this.commandHandlersInformation.getHandler(command);

    if (!handler) {
      throw new NoHandlerForMessageError(command);
    }

    handler.handle(command);
  }
}
