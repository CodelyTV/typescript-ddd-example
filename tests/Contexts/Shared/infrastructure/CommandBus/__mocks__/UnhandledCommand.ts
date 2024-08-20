import { Command } from '@/Contexts/Shared/domain/Command';

export class UnhandledCommand extends Command {
  static COMMAND_NAME = 'unhandled.command';
}
