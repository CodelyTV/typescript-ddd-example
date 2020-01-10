import FileCourseRepository from '../../../../../src/Contexts/Mooc/Courses/infrastructure/FileCourseRepository';
import Course from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseId } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseId';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';

describe('Save Course', () => {
  it('should have a course', () => {
    const repository = new FileCourseRepository();
    const course = new Course(new CourseId('id'), new CourseName('name'), new CourseDuration(20));

    repository.save(course);
  });
});
