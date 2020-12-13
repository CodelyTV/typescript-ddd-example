import { SearchAllCoursesResponse } from '../../../../../src/Contexts/Backoffice/Courses/application/SearchAll/SearchAllCoursesResponse';
import { BackofficeCourse } from '../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourse';

export class SearchAllCoursesResponseMother {
  static create(courses: Array<BackofficeCourse>) {
    return new SearchAllCoursesResponse(courses);
  }
}
