import Course from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import CourseCreator from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import CourseRepository from '../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';

describe('Course Creator', () => {
  it('should create a valid course', async () => {
    const save = jest.fn();
    const repository: CourseRepository = {
      save,
      search: jest.fn()
    };

    const createCourse = new CourseCreator(repository);

    const id = 'some-id';
    const name = 'some-name';
    const duration = 'some-duration';

    const course = new Course(id, name, duration);

    await createCourse.run(id, name, duration);

    expect(save).toHaveBeenCalledWith(course);
  });
});
