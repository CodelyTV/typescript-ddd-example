export abstract class Command {
  readonly commandName: string;

  constructor(commandName: string) {
    this.commandName = commandName;
  }
}