import { Command } from './Command';

export interface CommandHandler<T extends Command> {
  subscribedTo(): T;
  handle(command: T): void;
}
