import { Command } from '../../domain/Command';

export class NoHandlerForMessageError extends Error {
  constructor(command: Command) {
    super(`There is not handler for command of type ${command.constructor.name}`);
  }
}
