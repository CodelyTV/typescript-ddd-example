import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { CoursesCounterTotal } from './CoursesCounterTotal';
import { CoursesCounterId } from './CoursesCounterId';
import { CoursesCounterIncrementedDomainEvent } from './CoursesCounterIncrementedDomainEvent';
import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class CoursesCounter extends AggregateRoot {
  readonly id: CoursesCounterId;
  private _total: CoursesCounterTotal;
  readonly existingCourses: Array<CourseId>;

  constructor(id: CoursesCounterId, total: CoursesCounterTotal, existingCourses?: Array<CourseId>) {
    super();
    this.id = id;
    this._total = total;
    this.existingCourses = existingCourses || [];
  }

  public get total(): CoursesCounterTotal {
    return this._total;
  }

  static initialize(id: Uuid): CoursesCounter {
    return new CoursesCounter(id, CoursesCounterTotal.initialize());
  }

  increment(courseId: CourseId) {
    this._total = this.total.increment();
    this.existingCourses.push(courseId);
    this.record(new CoursesCounterIncrementedDomainEvent({ aggregateId: this.id.value, total: this.total.value }));
  }

  hasIncremented(courseId: CourseId): boolean {
    const exists = this.existingCourses.find(entry => entry.value === courseId.value);
    return exists !== undefined;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      total: this.total.value,
      existingCourses: this.existingCourses.map(courseId => courseId.value)
    };
  }

  static fromPrimitives(data: { id: string; total: number; existingCourses: string[] }): CoursesCounter {
    return new CoursesCounter(
      new CoursesCounterId(data.id),
      new CoursesCounterTotal(data.total),
      data.existingCourses.map(entry => new CourseId(entry))
    );
  }
}
