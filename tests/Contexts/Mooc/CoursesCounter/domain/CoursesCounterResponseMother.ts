import { CoursesCounterTotal } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterTotal';
import { FindCoursesCounterResponse } from '../../../../../src/Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterResponse';

export class CoursesCounterResponseMother {
  static create(total: CoursesCounterTotal) {
    return new FindCoursesCounterResponse(total.value);
  }
}
