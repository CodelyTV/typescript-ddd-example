import { CoursesResponse } from "@/Contexts/Mooc/Courses/application/SearchAll/CoursesResponse";
import { Course } from "@/Contexts/Mooc/Courses/domain/Course";

export class SearchAllCoursesResponseMother {
  static create(courses: Array<Course>) {
    return new CoursesResponse(courses);
  }
}
