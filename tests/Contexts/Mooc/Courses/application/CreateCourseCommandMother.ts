import { CourseDurationMother } from '../domain/CourseDurationMother';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { CourseNameMother } from '../domain/CourseNameMother';
import { CreateCourseCommand } from '../../../../../src/Contexts/Mooc/Courses/application/CreateCourse/CreateCourseCommand';
import { CourseDescriptionMother } from '../domain/CourseDescriptionMother';

export class CreateCourseCommandMother {
  static create(id: string, name: string, duration: string, description: string): CreateCourseCommand {
    return new CreateCourseCommand({ id, name, duration, description });
  }

  static random(): CreateCourseCommand {
    return this.create(CourseIdMother.random().value, CourseNameMother.random().value, CourseDurationMother.random().value, CourseDescriptionMother.random().value);
  }
}
