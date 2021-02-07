import { BackofficeCourseCreator } from '../../../../../../src/Contexts/Backoffice/Courses/application/Create/BackofficeCourseCreator';
import { BackofficeCourseAlreadyExists } from '../../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourseAlreadyExists';
import { BackofficeCourseMother } from '../../domain/BackofficeCourseMother';
import { BackofficeCourseRepositoryMock } from '../../__mocks__/BackofficeCourseRepositoryMock';

describe('BackofficeCourseCreator', () => {
  it('creates a backoffice course', async () => {
    const course = BackofficeCourseMother.random();

    const repository = new BackofficeCourseRepositoryMock();
    const applicationService = new BackofficeCourseCreator(repository);

    await applicationService.run(course.id.toString(), course.duration.toString(), course.name.toString());

    repository.assertSaveHasBeenCalledWith(course);
  });

  it('throws an error if the course already exists', async () => {
    const course = BackofficeCourseMother.random();
    const repository = new BackofficeCourseRepositoryMock();
    repository.returnMatching([course]);
    const applicationService = new BackofficeCourseCreator(repository);

    expect(
      applicationService.run(course.id.toString(), course.duration.toString(), course.name.toString())
    ).rejects.toBeInstanceOf(BackofficeCourseAlreadyExists);
  });
});
