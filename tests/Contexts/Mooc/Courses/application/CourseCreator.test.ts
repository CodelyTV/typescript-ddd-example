import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { CourseMother } from '../domain/CourseMother';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';
import { CreateCourseCommandMother } from './CreateCourseCommandMother';
import EventBusMock from '../__mocks__/EventBusMock';
import { CreateCourseCommandHandler } from '../../../../../src/Contexts/Mooc/Courses/application/CreateCourseCommandHandler';

let repository: CourseRepositoryMock;
let handler: CreateCourseCommandHandler;

const eventBus = new EventBusMock();

beforeEach(() => {
  repository = new CourseRepositoryMock();
  const creator = new CourseCreator(repository, eventBus);
  handler = new CreateCourseCommandHandler(creator);
});

describe('CourseCreator', () => {
  it('should create a valid course', async () => {
    const command = CreateCourseCommandMother.random();
    await handler.handle(command);

    const course = CourseMother.fromCommand(command);
    repository.assertLastSavedCourseIs(course);
  });
});
