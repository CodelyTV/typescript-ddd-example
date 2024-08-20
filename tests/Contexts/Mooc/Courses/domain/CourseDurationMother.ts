import { CourseDuration } from '@/Contexts/Mooc/Courses/domain/CourseDuration';
import { WordMother } from '../../../Shared/domain/WordMother';

export class CourseDurationMother {
  static create(value: string): CourseDuration {
    return new CourseDuration(value);
  }

  static random(): CourseDuration {
    return this.create(WordMother.random({ maxLength: 30 }));
  }
}