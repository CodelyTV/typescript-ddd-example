import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  name: string;
  duration: string;
};

export class CreateCourseCommand extends Command {
  id: string;
  name: string;
  duration: string;

  constructor({ id, name, duration }: Params) {
    super();
    this.id = id;
    this.name = name;
    this.duration = duration;
  }
}
