import { BackofficeCoursesResponse } from '@/Contexts/Backoffice/Courses/application/BackofficeCoursesResponse';
import { BackofficeCourse } from '@/Contexts/Backoffice/Courses/domain/BackofficeCourse';

export class SearchCoursesByCriteriaResponseMother {
  static create(courses: Array<BackofficeCourse>) {
    return new BackofficeCoursesResponse(courses);
  }
}
