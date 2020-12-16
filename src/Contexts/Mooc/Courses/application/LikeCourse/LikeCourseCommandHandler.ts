import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { LikeCourseCommand } from './LikeCourseCommand';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { CourseLiker } from './CourseLiker';
import { UserId } from '../../domain/UserId';
export class LikeCourseCommandHandler implements CommandHandler<LikeCourseCommand> {
  constructor(private courseLiker: CourseLiker) {}

  subscribedTo(): Command {
    return LikeCourseCommand;
  }

  handle(command: LikeCourseCommand): Promise<void> {
    const courseId = new CourseId(command.id);
    const userId = new UserId(command.userId);
    return this.courseLiker.run({ courseId, userId });
  }
}
