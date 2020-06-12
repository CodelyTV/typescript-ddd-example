import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { CourseMother } from '../domain/CourseMother';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';
import { CreateCourseRequestMother } from './CreateCourseRequestMother';
import EventBusMock from '../__mocks__/EventBusMock';

let repository: CourseRepositoryMock;
let creator: CourseCreator;

const eventBus = new EventBusMock();

beforeEach(() => {
  repository = new CourseRepositoryMock();
  creator = new CourseCreator(repository, eventBus);
});

it('should create a valid course', async () => {
  const request = CreateCourseRequestMother.random();

  const course = CourseMother.fromRequest(request);

  await creator.run(request);

  repository.assertLastSavedCourseIs(course);
});
