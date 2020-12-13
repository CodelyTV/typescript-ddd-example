import { BackofficeCourseName } from '../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourseName';
import { WordMother } from '../../../Shared/domain/WordMother';

export class BackofficeCourseNameMother {
  static create(value: string): BackofficeCourseName {
    return new BackofficeCourseName(value);
  }

  static random(): BackofficeCourseName {
    return this.create(WordMother.random());
  }
}
