import { BackofficeCoursesResponse } from '../../../../../src/Contexts/Backoffice/Courses/application/BackofficeCoursesResponse';
import { BackofficeCourse } from '../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourse';

export class SearchCoursesByCriteriaResponseMother {
  static create(courses: Array<BackofficeCourse>) {
    return new BackofficeCoursesResponse(courses);
  }
}
