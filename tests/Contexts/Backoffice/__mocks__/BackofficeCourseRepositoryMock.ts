import { BackofficeCourse } from '../../../../src/Contexts/Backoffice/domain/BackofficeCourse';
import { BackofficeCourseRepository } from '../../../../src/Contexts/Backoffice/domain/BackofficeCourseRepository';

export class BackofficeCourseRepositoryMock implements BackofficeCourseRepository {
  private mockSearchAll = jest.fn();
  private courses: Array<BackofficeCourse> = [];

  returnOnSearchAll(courses: Array<BackofficeCourse>) {
    this.courses = courses;
  }

  async searchAll(): Promise<BackofficeCourse[]> {
    this.mockSearchAll();
    return this.courses;
  }

  assertSearchAll() {
    expect(this.mockSearchAll).toHaveBeenCalled();
  }
}
