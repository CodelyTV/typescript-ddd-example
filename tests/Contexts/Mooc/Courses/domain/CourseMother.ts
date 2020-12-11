import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CourseName } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseName';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { CourseNameMother } from './CourseNameMother';
import { CourseDurationMother } from './CourseDurationMother';
import { CreateCourseCommand } from '../../../../../src/Contexts/Mooc/Courses/application/CreateCourse/CreateCourseCommand';
import { RenameCourseCommand } from '../../../../../src/Contexts/Mooc/Courses/application/RenameCourse/RenameCourseCommand';
import { CourseDescription } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDescription';
import { CourseDescriptionMother } from './CourseDescriptionMother';

export class CourseMother {
  static create(id: CourseId, name: CourseName, duration: CourseDuration, description: CourseDescription): Course {
    return new Course(id, name, duration, description);
  }

  static fromCreateCommand(command: CreateCourseCommand): Course {
    return this.create(
      CourseIdMother.create(command.id),
      CourseNameMother.create(command.name),
      CourseDurationMother.create(command.duration),
      CourseDescriptionMother.create(command.description)
    );
  }

  static fromRenameCommand(command: RenameCourseCommand): Course {
    return this.create(
      CourseIdMother.create(command.id),
      CourseNameMother.create(command.name),
      CourseDurationMother.random(),
      CourseDescriptionMother.random()
    );
  }

  static random(): Course {
    return this.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random(), CourseDescriptionMother.random());
  }
}
