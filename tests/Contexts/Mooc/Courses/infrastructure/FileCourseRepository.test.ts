import FileCourseRepository from '../../../../../src/Contexts/Mooc/Courses/infrastructure/FileCourseRepository';
import Course from '../../../../../src/Contexts/Mooc/Courses/domain/Course';

describe('Save Course', () => {
  it('should have a course', () => {
    const repository = new FileCourseRepository();
    const course = new Course('id', 'name', 'duration');

    repository.save(course);
  });
});
