import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseRepository } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';

export class CourseRepositoryMock implements CourseRepository {
  private saveMock: jest.Mock;
  private searchAllMock: jest.Mock;
  private courses: Array<Course> = [];

  constructor() {
    this.saveMock = jest.fn();
    this.searchAllMock = jest.fn();
  }

  async save(course: Course): Promise<void> {
    this.saveMock(course);
  }

  assertSaveHaveBeenCalledWith(expected: Course): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  returnOnSearchAll(courses: Array<Course>) {
    this.courses = courses;
  }

  assertSearchAll() {
    expect(this.searchAllMock).toHaveBeenCalled();
  }

  async searchAll(): Promise<Course[]> {
    this.searchAllMock();
    return this.courses;
  }

}
