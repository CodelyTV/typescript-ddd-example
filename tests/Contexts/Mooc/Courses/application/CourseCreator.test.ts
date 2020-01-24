import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { CourseMother } from '../domain/CourseMother';
import { CreateCourseRequestMother } from './CreateCourseRequestMother';
import { CourseRepository } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { EventBus } from '../../../../../src/Contexts/Shared/domain/EventBus';

let repository: CourseRepository;
let creator: CourseCreator;

const createRepository = (): CourseRepository => ({ save: jest.fn(), search: jest.fn() });
const eventBus = (): EventBus => ({ publish: jest.fn()});
const shouldSave = (course: Course) => expect(repository.save).toHaveBeenCalledWith(course);

beforeEach(() => {
  repository = createRepository();
  creator = new CourseCreator(repository, eventBus());
});

it('should create a valid course', async () => {
  const request = CreateCourseRequestMother.random();

  const course = CourseMother.fromRequest(request);

  await creator.run(request);

  shouldSave(course);
});
