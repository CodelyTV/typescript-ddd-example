import { Command } from '../../../../../../src/Contexts/Shared/domain/Command';

export class DummyCommand extends Command {
  static COMMAND_NAME = 'handled.command';
}
