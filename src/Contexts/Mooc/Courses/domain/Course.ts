import { AggregateRoot } from './AggregateRoot';
import { CourseCreatedDomainEvent } from './CourseCreatedDomainEvent';
import { CourseId } from './CourseId';
import { CourseName } from './CourseName';
import { CourseDuration } from './CourseDuration';

export default class Course extends AggregateRoot {
  readonly id: CourseId;
  readonly name: CourseName;
  readonly duration: CourseDuration;

  constructor(id: CourseId, name: CourseName, duration: CourseDuration) {
    super();
    this.id = id;
    this.name = name;
    this.duration = duration;
  }

  static create(id: CourseId, name: CourseName, duration: CourseDuration): Course {
    const course = new Course(id, name, duration);

    course.record(
      new CourseCreatedDomainEvent({
        id: course.id.value(),
        duration: course.duration.value(),
        name: course.name.value()
      })
    );

    return course;
  }
}
