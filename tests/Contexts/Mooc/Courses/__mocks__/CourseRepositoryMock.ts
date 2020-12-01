import { CourseRepository } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';

export class CourseRepositoryMock implements CourseRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();
  private course: Nullable<Course> = null;

  async save(course: Course): Promise<void> {
    this.mockSave(course);
  }

  assertLastSavedCourseIs(expected: Course): void {
    const mock = this.mockSave.mock;
    const lastSavedCourse = mock.calls[mock.calls.length - 1][0] as Course;
    expect(lastSavedCourse).toBeInstanceOf(Course);
    expect(lastSavedCourse.toPrimitives()).toEqual(expected.toPrimitives());
  }

  async search(id: CourseId): Promise<Nullable<Course>> {
    this.mockSearch(id);
    return this.course;
  }

  whenSearchThenReturn(value: Nullable<Course>): void {
    this.mockSearch.mockReturnValue(value);
  }

  assertLastSearchedCourseIs(expected: CourseId): void {
    expect(this.mockSearch).toHaveBeenCalledWith(expected);
  }

  assertSearch(expected: CourseId) {
    expect(this.mockSearch).toHaveBeenCalled();
    expect(this.mockSearch).toHaveBeenCalledWith(expected);
  }

  returnOnSearch(course: Course) {
    this.course = course;
  }
}
