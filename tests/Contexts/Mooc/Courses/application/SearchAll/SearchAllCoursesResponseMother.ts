import { CoursesResponse } from "../../../../../../src/Contexts/Mooc/Courses/application/SearchAll/CoursesResponse";
import { Course } from "../../../../../../src/Contexts/Mooc/Courses/domain/Course";

export class SearchAllCoursesResponseMother {
  static create(courses: Array<Course>) {
    return new CoursesResponse(courses);
  }
}
