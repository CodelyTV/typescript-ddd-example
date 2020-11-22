import { BackofficeCourse } from '../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourse';
import { BackofficeCourseRepository } from '../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourseRepository';

export class BackofficeCourseRepositoryMock implements BackofficeCourseRepository {
  private mockSearchAll = jest.fn();
  private mockSave = jest.fn();
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

  async save(course: BackofficeCourse): Promise<void> {
    this.mockSave(course);
  }

  assertSaveHasBeenCalledWith(course: BackofficeCourse) {
    expect(this.mockSave).toHaveBeenCalledWith(course);
  }
}
