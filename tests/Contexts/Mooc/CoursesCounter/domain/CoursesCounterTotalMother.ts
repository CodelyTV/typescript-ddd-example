import { CoursesCounterTotal } from '@/Contexts/Mooc/CoursesCounter/domain/CoursesCounterTotal';
import { IntegerMother } from '../../../Shared/domain/IntegerMother';

export class CoursesCounterTotalMother {
  static random() {
    return new CoursesCounterTotal(IntegerMother.random());
  }
}
