import { Command } from './Command';

export interface CommandHandler<T extends Command> {
  subscribedTo(): Command;
  handle(command: T): Promise<void>;
}
