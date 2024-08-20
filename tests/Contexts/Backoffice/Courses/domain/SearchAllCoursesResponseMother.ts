import { BackofficeCoursesResponse } from "@/Contexts/Backoffice/Courses/application/BackofficeCoursesResponse";
import { BackofficeCourse } from "@/Contexts/Backoffice/Courses/domain/BackofficeCourse";

export class SearchAllCoursesResponseMother {
  static create(courses: Array<BackofficeCourse>) {
    return new BackofficeCoursesResponse(courses);
  }
}
