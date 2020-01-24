import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CreateCourseRequest } from '../../../../../src/Contexts/Mooc/Courses/application/CreateCourseRequest';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { CourseNameMother } from './CourseNameMother';
import { CourseDurationMother } from './CourseDurationMother';

export class CourseMother {
  static create(id: CourseId, name: CourseName, duration: CourseDuration): Course {
    return new Course(id, name, duration);
  }

  static fromRequest(request: CreateCourseRequest): Course {
    return this.create(
      CourseIdMother.create(request.id),
      CourseNameMother.create(request.name),
      CourseDurationMother.create(request.duration)
    );
  }

  static random(): Course {
    return this.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random());
  }
}
