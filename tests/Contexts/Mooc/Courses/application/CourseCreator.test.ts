import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { CourseRepository } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';

describe('Course Creator', () => {
  it('should create a valid course', async () => {
    const save = jest.fn();
    const repository: CourseRepository = {
      save,
      search: jest.fn()
    };

    const createCourse = new CourseCreator(repository);

    const id = '0766c602-d4d4-48b6-9d50-d3253123275e';
    const name = 'some-name';
    const duration = 'some-duration';

    const course = new Course(new CourseId(id), name, duration);

    await createCourse.run({ id, name, duration });

    expect(save).toHaveBeenCalledWith(course);
  });
});
