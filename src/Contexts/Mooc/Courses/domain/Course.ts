import { AggregateRoot } from './AggregateRoot';
import { CourseCreatedDomainEvent } from './CourseCreatedDomainEvent';
import { CourseDuration } from './CourseDuration';
import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { CourseName } from '../../Shared/domain/Courses/CourseName';
import { CourseRenamedDomainEvent } from './CourseRenamedDomainEvent';
import { CourseDescription } from './CourseDescription';

export class Course extends AggregateRoot {
  readonly id: CourseId;
  name: CourseName;
  duration: CourseDuration;
  description: CourseDescription;

  constructor(id: CourseId, name: CourseName, duration: CourseDuration, description: CourseDescription) {
    super();
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.description = description;
  }

  static create(id: CourseId, name: CourseName, duration: CourseDuration, description: CourseDescription): Course {
    const course = new Course(id, name, duration, description);

    course.record(
      new CourseCreatedDomainEvent({
        id: course.id.value,
        duration: course.duration.value,
        name: course.name.value,
        description: course.description.value
      })
    );

    return course;
  }

  rename(name: CourseName) {
    const oldName = this.name;
    this.name = name;

    this.record(
      new CourseRenamedDomainEvent({
        id: this.id.value,
        oldName: oldName.value,
        newName: name.value
      })
    )
  }

  static fromPrimitives(plainData: { id: string; name: string; duration: string, description: string }): Course {
    return new Course(
      new CourseId(plainData.id),
      new CourseName(plainData.name),
      new CourseDuration(plainData.duration),
      new CourseDescription(plainData.description)
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      duration: this.duration.value,
      description: this.description.value
    };
  }
}
