import { BackofficeCoursesResponse } from "../../../../../src/Contexts/Backoffice/Courses/application/BackofficeCoursesResponse";
import { BackofficeCourse } from "../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourse";

export class SearchAllCoursesResponseMother {
  static create(courses: Array<BackofficeCourse>) {
    return new BackofficeCoursesResponse(courses);
  }
}
