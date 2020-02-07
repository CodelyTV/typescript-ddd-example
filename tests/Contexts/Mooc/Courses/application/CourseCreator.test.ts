import { CourseMother } from '../domain/CourseMother';
import { CreateCourseRequestMother } from './CreateCourseRequestMother';
import { CourseCreatedDomainEventMother } from '../domain/CourseCreatedDomainEventMother';
import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import CourseRepositoryDouble from '../doubles/CourseRepositoryDouble';
import EventBusDouble from '../doubles/EventBusDouble';

let repository: CourseRepositoryDouble;
let eventBus: EventBusDouble;
let creator: CourseCreator;

describe('Course Creator', () => {
  beforeEach(() => {
    repository = new CourseRepositoryDouble();
    eventBus = new EventBusDouble();
    creator = new CourseCreator(repository, eventBus);
  });

  it('should create a valid course', async () => {
    const request = CreateCourseRequestMother.random();

    await creator.run(request);

    const expectedCourse = CourseMother.fromRequest(request);
    repository.assertLastSavedCourseIs(expectedCourse);

    const expectedEvent = CourseCreatedDomainEventMother.fromCourse(expectedCourse);
    eventBus.assertLastPublishedEventIs(expectedEvent);
  });
});
