import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CourseName } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseName';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { CourseNameMother } from './CourseNameMother';
import { CourseDurationMother } from './CourseDurationMother';
import { CreateCourseCommand } from '../../../../../src/Contexts/Mooc/Courses/application/CreateCourse/CreateCourseCommand';
import { RenameCourseCommand } from '../../../../../src/Contexts/Mooc/Courses/application/RenameCourse/RenameCourseCommand';

export class CourseMother {
  static create(id: CourseId, name: CourseName, duration: CourseDuration): Course {
    return new Course(id, name, duration);
  }

  static fromCreateCommand(command: CreateCourseCommand): Course {
    return this.create(
      CourseIdMother.create(command.id),
      CourseNameMother.create(command.name),
      CourseDurationMother.create(command.duration)
    );
  }

  static fromRenameCommand(command: RenameCourseCommand): Course {
    return this.create(
      CourseIdMother.create(command.id),
      CourseNameMother.create(command.name),
      CourseDurationMother.random()
    );
  }

  static random(): Course {
    return this.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random());
  }
}
