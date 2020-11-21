import { Command } from './Command';

export interface CommandBus {
  dispatch(command: Command): Promise<void>;
}
