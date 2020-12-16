import { LikeCourseCommand } from '../../../../../../src/Contexts/Mooc/Courses/application/LikeCourse/LikeCourseCommand';
import { CourseIdMother } from '../../../Shared/domain/Courses/CourseIdMother';
import { UserIdMother } from './UserIdMother';

export class LikeCourseCommandMother {
  static create(id: string, userId: string): LikeCourseCommand {
    return new LikeCourseCommand({ id, userId });
  }

  static random(): LikeCourseCommand {
    return this.create(CourseIdMother.random().value, UserIdMother.random().value);
  }
}
