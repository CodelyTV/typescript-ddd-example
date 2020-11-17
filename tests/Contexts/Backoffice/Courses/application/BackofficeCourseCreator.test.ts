import { BackofficeCourseCreator } from '../../../../../src/Contexts/Backoffice/Courses/application/BackofficeCourseCreator';
import { BackofficeCourseRepositoryMock } from '../../Shared/__mocks__/BackofficeCourseRepositoryMock';
import { BackofficeCourseMother } from '../domain/BackofficeCourseMother';

describe('BackofficeCourseCreator', () => {
  it('creates a backoffice course', async () => {
    const course = BackofficeCourseMother.random();

    const repository = new BackofficeCourseRepositoryMock();
    const applicationService = new BackofficeCourseCreator(repository);

    await applicationService.run(course.id.toString(), course.duration.toString(), course.name.toString());

    repository.assertSaveHasBeenCalledWith(course);
  });
});
