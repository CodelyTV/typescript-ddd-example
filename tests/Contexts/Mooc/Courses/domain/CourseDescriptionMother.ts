import { WordMother } from '../../../Shared/domain/WordMother';
import { CourseDescription } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDescription';

export class CourseDescriptionMother {
  static create(value: string): CourseDescription {
    return new CourseDescription(value);
  }

  static random(): CourseDescription {
    return this.create(WordMother.random());
  }
}
