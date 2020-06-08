import { CommandBus } from './../../domain/CommandBus';
import { Command } from '../../domain/Command';
import { NoHandlerForMessageError } from './NoHandlerForMessageError';

export class InMemoryCommandBus implements CommandBus {
  dispatch(command: Command): void {
    throw new NoHandlerForMessageError(command);
  }
}