import { CourseRepository } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';

export default class CourseRepositoryDouble implements CourseRepository {
  private spySave: jest.Mock = jest.fn();

  async save(course: Course) {
    this.spySave(course);
  }

  assertLastSavedCourseIs(expected: Course): void {
    const saveCalls = this.spySave.mock.calls;

    expect(saveCalls.length).toBeGreaterThan(0);

    const lastSaveCall = saveCalls[saveCalls.length - 1];
    const lastSavedCourse = lastSaveCall[0];
    const lastSavedCourseWithoutEvents = new Course(lastSavedCourse.id, lastSavedCourse.name, lastSavedCourse.duration);

    expect(expected).toMatchObject(lastSavedCourseWithoutEvents);
  }

  async search(id: CourseId) {
    return null;
  }
}
