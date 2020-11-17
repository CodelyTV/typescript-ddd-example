import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { BackofficeCourseDuration } from './BackofficeCourseDuration';
import { BackofficeCourseId } from './BackofficeCourseId';
import { BackofficeCourseName } from './BackofficeCourseName';

export class BackofficeCourse extends AggregateRoot {
  readonly id: BackofficeCourseId;
  readonly name: BackofficeCourseName;
  readonly duration: BackofficeCourseDuration;

  constructor(id: BackofficeCourseId, name: BackofficeCourseName, duration: BackofficeCourseDuration) {
    super();
    this.id = id;
    this.name = name;
    this.duration = duration;
  }

  static create(
    id: BackofficeCourseId,
    name: BackofficeCourseName,
    duration: BackofficeCourseDuration
  ): BackofficeCourse {
    const course = new BackofficeCourse(id, name, duration);

    return course;
  }

  static fromPrimitives(plainData: { id: string; name: string; duration: string }): BackofficeCourse {
    return new BackofficeCourse(
      new BackofficeCourseId(plainData.id),
      new BackofficeCourseName(plainData.name),
      new BackofficeCourseDuration(plainData.duration)
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      duration: this.duration.value
    };
  }
}
