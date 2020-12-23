import { Response } from '../../../Shared/domain/Response';
import { BackofficeCourse } from '../domain/BackofficeCourse';

export class BackofficeCourseResponse implements Response {
  readonly id: string;
  readonly name: string;
  readonly duration: string;

  constructor(id: string, name: string, duration: string) {
    this.id = id;
    this.name = name;
    this.duration = duration;
  }

  static fromAggregate(backofficeCourse: BackofficeCourse): BackofficeCourseResponse {
    return new BackofficeCourseResponse(
      backofficeCourse.id.value,
      backofficeCourse.name.value,
      backofficeCourse.duration.value
    );
  }
}
