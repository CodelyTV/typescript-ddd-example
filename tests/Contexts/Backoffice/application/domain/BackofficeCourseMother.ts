import { BackofficeCourse } from '../../../../../src/Contexts/Backoffice/domain/BackofficeCourse';
import { BackofficeCourseDuration } from '../../../../../src/Contexts/Backoffice/domain/BackofficeCourseDuration';
import { BackofficeCourseId } from '../../../../../src/Contexts/Backoffice/domain/BackofficeCourseId';
import { BackofficeCourseName } from '../../../../../src/Contexts/Backoffice/domain/BackofficeCourseName';
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

  static random(): BackofficeCourse {
    return this.create(
      BackofficeCourseIdMother.random(),
      BackofficeCourseNameMother.random(),
      BackofficeCourseDurationMother.random()
    );
  }
}
