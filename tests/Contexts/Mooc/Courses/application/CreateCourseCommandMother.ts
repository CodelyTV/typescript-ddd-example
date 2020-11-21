import { CourseDurationMother } from '../domain/CourseDurationMother';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { CourseNameMother } from '../domain/CourseNameMother';
import { CreateCourseCommand } from '../../../../../src/Contexts/Mooc/Courses/application/CreateCourseCommand';

export class CreateCourseCommandMother {
  static create(id: string, name: string, duration: string): CreateCourseCommand {
    return new CreateCourseCommand({ id, name, duration });
  }

  static random(): CreateCourseCommand {
    return this.create(CourseIdMother.random().value, CourseNameMother.random().value, CourseDurationMother.random().value);
  }
}
