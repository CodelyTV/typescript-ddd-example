import { Command } from '../../../../Shared/domain/Command';

type Params = {
  id: string;
  userId: string;
};

export class LikeCourseCommand implements Command {
  readonly id: string;
  readonly userId: string;

  constructor({ id, userId }: Params) {
    this.id = id;
    this.userId = userId;
  }
}
