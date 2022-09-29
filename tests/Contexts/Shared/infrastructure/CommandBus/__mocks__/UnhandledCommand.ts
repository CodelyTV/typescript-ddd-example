import { Command } from '../../../../../../src/Contexts/Shared/domain/Command';

export class UnhandledCommand extends Command {
  static COMMAND_NAME = 'unhandled.command';
}
