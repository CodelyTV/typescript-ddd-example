import { Command } from '../../domain/Command';
import { CommandBus } from './../../domain/CommandBus';
import { CommandHandlersInformation } from './CommandHandlersInformation';
import { NoHandlerForMessageError } from './NoHandlerForMessageError';

export class InMemoryCommandBus implements CommandBus {
  constructor(private commandHandlersInformation: CommandHandlersInformation) {}

  dispatch(command: Command): void {
    const handler = this.commandHandlersInformation.getCommandHandler(command);

    if (!handler) {
      throw new NoHandlerForMessageError(command);
    }

    handler.handle(command);
  }
}
