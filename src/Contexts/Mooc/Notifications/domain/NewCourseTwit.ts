import { CourseName } from '../../Shared/domain/Courses/CourseName';
import { Twit } from './Twit';
import { TwitMessage } from './TwitMessage';

export class NewCourseTwit extends Twit {
  constructor(courseName: CourseName) {
    super({
      message: new TwitMessage(`New course published. ${courseName}`),
    });
  }
}
