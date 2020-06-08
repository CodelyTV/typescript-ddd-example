import { Command } from './Command';

export interface CommandBus {
  dispatch(command: Command): void;
}