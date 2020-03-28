import { CoursesCounter } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounter';
import { CoursesCounterId } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterId';
import { CoursesCounterTotal } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterTotal';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { Repeater } from '../../../Shared/domain/Repeater';

export class CoursesCounterMother {
  static random() {
    return new CoursesCounter(
      CoursesCounterId.random(),
      new CoursesCounterTotal(0),
      Repeater.random(CourseIdMother.creator())
    );
  }
}
