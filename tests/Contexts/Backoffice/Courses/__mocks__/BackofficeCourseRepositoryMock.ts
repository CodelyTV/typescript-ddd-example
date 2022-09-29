import { BackofficeCourse } from "../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourse";
import { BackofficeCourseRepository } from "../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourseRepository";
import { Criteria } from "../../../../../src/Contexts/Shared/domain/criteria/Criteria";

export class BackofficeCourseRepositoryMock implements BackofficeCourseRepository {
  private mockSearchAll = jest.fn();
  private mockSave = jest.fn();
  private mockMatching = jest.fn();
  private courses: Array<BackofficeCourse> = [];

  returnOnSearchAll(courses: Array<BackofficeCourse>) {
    this.courses = courses;
  }

  returnMatching(courses: Array<BackofficeCourse>) {
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

  async matching(criteria: Criteria): Promise<BackofficeCourse[]> {
    this.mockMatching(criteria);
    return this.courses;
  }

  assertMatchingHasBeenCalledWith() {
    expect(this.mockMatching).toHaveBeenCalled();
  }
}
