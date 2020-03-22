import { CoursesCounterFinder } from '../../../../../src/Contexts/Mooc/CoursesCounter/application/Find/CoursesCounterFinder';
import { CoursesCounterRepository } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterRepository';

describe('CoursesCounter Finder', () => {
  let finder: CoursesCounterFinder;
  const repository: CoursesCounterRepository = {
    search: jest.fn()
  };

  beforeEach(() => {
    finder = new CoursesCounterFinder(repository);
  });

  it('should return the courses counter', async () => {
    await finder.run();

    const expectedCourse = CourseMother.fromRequest(request);
    repository.assertLastSavedCourseIs(expectedCourse);

    const expectedEvent = CourseCreatedDomainEventMother.fromCourse(expectedCourse);
    eventBus.assertLastPublishedEventIs(expectedEvent);
  });
});
