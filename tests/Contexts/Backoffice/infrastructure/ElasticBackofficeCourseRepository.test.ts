import container from '../../../../src/apps/backoffice/backend/config/dependency-injection';
import { BackofficeCourse } from '../../../../src/Contexts/Backoffice/domain/BackofficeCourse';
import { ElasticBackofficeCourseRepository } from '../../../../src/Contexts/Backoffice/infrastructure/ElasticBackofficeCourseRepository';
import { EnvironmentArranger } from '../../Shared/infrastructure/arranger/EnvironmentArranger';
import { BackofficeCourseMother } from '../application/domain/BackofficeCourseMother';

const repository: ElasticBackofficeCourseRepository = container.get(
  'Backoffice.Backend.courses.BackofficeCourseRepositoryElastic'
);
const environmentArranger: Promise<EnvironmentArranger> = container.get(
  'Backoffice.Backend.ElasticEnvironmentArranger'
);

function sort(backofficeCourse1: BackofficeCourse, backofficeCourse2: BackofficeCourse): number {
  return backofficeCourse1?.id?.value.localeCompare(backofficeCourse2?.id?.value);
}

afterEach(async () => {
  await (await environmentArranger).arrange();
});

describe('Search all courses', () => {
  it('should return the existing courses', async () => {
    const courses = [BackofficeCourseMother.random(), BackofficeCourseMother.random()];

    await Promise.all(courses.map(async course => repository.save(course)));

    const expectedCourses = await repository.searchAll();

    expect(courses.length).toEqual(expectedCourses.length);
    expect(courses.sort(sort)).toEqual(expectedCourses.sort(sort));
  });
});
