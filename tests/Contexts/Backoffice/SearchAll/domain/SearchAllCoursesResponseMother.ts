import { BackofficeCourse } from '../../../../../src/Contexts/Backoffice/domain/BackofficeCourse';
import { SearchAllCoursesResponse } from '../../../../../src/Contexts/Backoffice/SearchAll/application/SearchAllCoursesResponse';

export class SearchAllCoursesResponseMother {
  static create(courses: Array<BackofficeCourse>) {
    return new SearchAllCoursesResponse(courses);
  }
}
