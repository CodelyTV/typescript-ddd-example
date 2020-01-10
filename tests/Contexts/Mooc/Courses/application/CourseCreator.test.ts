import Course from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import CourseCreator from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import CourseRepository from '../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';
import { EventBus } from '../../../../../src/Contexts/Shared/domain/EventBus';
import { CourseId } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseId';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';

describe('Course Creator', () => {
  it('should create a valid course', async () => {
    const save = jest.fn();
    const repository: CourseRepository = {
      save,
      search: jest.fn()
    };

    const eventBus: EventBus = {
      publish: jest.fn()
    };

    const createCourse = new CourseCreator(repository, eventBus);

    const id = new CourseId('some-id');
    const name = new CourseName('some-name');
    const duration = new CourseDuration(20);

    const course = new Course(id, name, duration);

    await createCourse.run(id, name, duration);

    expect(save).toHaveBeenCalledWith(course);
  });
});
