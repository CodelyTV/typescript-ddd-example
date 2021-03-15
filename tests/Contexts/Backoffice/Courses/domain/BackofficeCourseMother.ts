import { BackofficeCourse } from '../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourse';
import { BackofficeCourseDuration } from '../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourseDuration';
import { BackofficeCourseId } from '../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourseId';
import { BackofficeCourseName } from '../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourseName';
import { BackofficeCourseDurationMother } from './BackofficeCourseDurationMother';
import { BackofficeCourseIdMother } from './BackofficeCourseIdMother';
import { BackofficeCourseNameMother } from './BackofficeCourseNameMother';

export class BackofficeCourseMother {
  static create(
    id: BackofficeCourseId,
    name: BackofficeCourseName,
    duration: BackofficeCourseDuration
  ): BackofficeCourse {
    return new BackofficeCourse(id, name, duration);
  }

  static withNameAndDuration(name: string, duration: string): BackofficeCourse {
    return this.create(
      BackofficeCourseIdMother.random(),
      BackofficeCourseNameMother.create(name),
      BackofficeCourseDurationMother.create(duration)
    );
  }

  static random(): BackofficeCourse {
    return this.create(
      BackofficeCourseIdMother.random(),
      BackofficeCourseNameMother.random(),
      BackofficeCourseDurationMother.random()
    );
  }
}
