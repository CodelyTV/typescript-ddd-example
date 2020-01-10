import { FileCourseRepository } from '../../../../../src/Contexts/Mooc/Courses/infrastructure/FileCourseRepository';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';

describe('Save Course', () => {
  it('should have a course', () => {
    const repository = new FileCourseRepository();
    const course = new Course(new CourseId('0766c602-d4d4-48b6-9d50-d3253123275e'), 'name', 'duration');

    repository.save(course);
  });
});
