import { BackofficeCourseDuration } from '../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourseDuration';
import { WordMother } from '../../../Shared/domain/WordMother';

export class BackofficeCourseDurationMother {
  static create(value: string): BackofficeCourseDuration {
    return new BackofficeCourseDuration(value);
  }

  static random(): BackofficeCourseDuration {
    return this.create(WordMother.random());
  }
}
