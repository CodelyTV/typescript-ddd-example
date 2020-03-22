import { AggregateRoot } from '../../Courses/domain/AggregateRoot';
import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { CoursesCounterTotal } from './CoursesCounterTotal';
import { CoursesCounterId } from './CoursesCounterId';

export class CoursesCounter extends AggregateRoot {
  readonly id: CoursesCounterId;
  readonly total: CoursesCounterTotal;
  readonly existingCourses: Array<CourseId>;

  constructor(id: CoursesCounterId, total: CoursesCounterTotal, existingCourses: Array<CourseId>) {
    super();
    this.id = id;
    this.total = total;
    this.existingCourses = existingCourses;
  }

  increment(courseId: CourseId) {
    throw new Error('Method not implemented.');
  }

  hasIncremented(courseId: CourseId): boolean {
    throw new Error('Method not implemented.');
  }

  static initialize(arg0: CoursesCounterId): CoursesCounter {
    throw new Error('Method not implemented.');
  }
}
