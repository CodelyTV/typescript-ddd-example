import { Command } from '@/Contexts/Shared/domain/Command';

export class DummyCommand extends Command {
  static COMMAND_NAME = 'handled.command';
}
