import Course from '../../../../src/Mooc/Courses/domain/Course';
import FileCourseRepository from '../../../../src/Mooc/Courses/infrastructure/FileCourseRepository';

describe('Save Course', () => {
  it('should have a course', () => {
    const repository = new FileCourseRepository();
    const course = new Course('id', 'name', 'duration');

    repository.save(course);
  });
});
