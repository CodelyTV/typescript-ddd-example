import Course from '../../../../src/Mooc/Courses/domain/Course';
import CreateCourse from '../../../../src/Mooc/Courses/application/CreateCourse';
import CourseRepository from '../../../../src/Mooc/Courses/domain/CourseRepository';

describe('Create Course', () => {
  it('should create a valid course', async () => {
    const save = jest.fn();
    const repository: CourseRepository = {
      save,
      search: jest.fn()
    };

    const createCourse = new CreateCourse(repository);

    const id = 'some-id';
    const name = 'some-name';
    const duration = 'some-duration';

    const course = new Course(id, name, duration);

    await createCourse.run(id, name, duration);

    expect(save).toHaveBeenCalledWith(course);
  });
});
