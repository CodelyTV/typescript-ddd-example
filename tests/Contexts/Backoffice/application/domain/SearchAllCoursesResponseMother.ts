import { BackofficeCourse } from '../../../../../src/Contexts/Backoffice/domain/BackofficeCourse';
import { SearchAllCoursesResponse } from '../../../../../src/Contexts/Backoffice/application/SearchAll/SearchAllCoursesResponse';

export class SearchAllCoursesResponseMother {
  static create(courses: Array<BackofficeCourse>) {
    return new SearchAllCoursesResponse(courses);
  }
}
