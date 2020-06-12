import { Command } from '../../domain/Command';
import { CommandBus } from './../../domain/CommandBus';
import { CommandHandlersInformation } from './CommandHandlersInformation';

export class InMemoryCommandBus implements CommandBus {
  constructor(private commandHandlersInformation: CommandHandlersInformation) {}

  dispatch(command: Command): void {
    const handler = this.commandHandlersInformation.search(command);

    handler.handle(command);
  }
}
