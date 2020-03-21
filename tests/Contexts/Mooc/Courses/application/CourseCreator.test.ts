import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { EventBus } from '../../../../../src/Contexts/Shared/domain/EventBus';
import { CourseMother } from '../domain/CourseMother';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';
import { CreateCourseRequestMother } from './CreateCourseRequestMother';

let repository: CourseRepositoryMock;
let creator: CourseCreator;

const eventBus = (): EventBus => ({ publish: jest.fn() });

beforeEach(() => {
  repository = new CourseRepositoryMock();
  creator = new CourseCreator(repository, eventBus());
});

it('should create a valid course', async () => {
  const request = CreateCourseRequestMother.random();

  const course = CourseMother.fromRequest(request);

  await creator.run(request);

  repository.assertLastSavedCourseIs(course);
});
