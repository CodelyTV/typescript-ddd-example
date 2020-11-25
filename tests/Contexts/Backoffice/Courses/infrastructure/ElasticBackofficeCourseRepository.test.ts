import container from '../../../../../src/apps/backoffice/backend/config/dependency-injection';
import { BackofficeCourse } from '../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourse';
import { ElasticBackofficeCourseRepository } from '../../../../../src/Contexts/Backoffice/Courses/infrastructure/persistence/ElasticBackofficeCourseRepository';
import { EnvironmentArranger } from '../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { BackofficeCourseMother } from '../domain/BackofficeCourseMother';

const repository: ElasticBackofficeCourseRepository = container.get(
  'Backoffice.courses.BackofficeCourseRepositoryElastic'
);
const environmentArranger: Promise<EnvironmentArranger> = container.get(
  'Backoffice.Backend.ElasticEnvironmentArranger'
);

afterEach(async () => {
  await (await environmentArranger).arrange();
});

describe('ElasticBackofficeCourseRepository', () => {
  describe('#searchAll', () => {
    it('should return the existing courses', async () => {
      const courses = [BackofficeCourseMother.random(), BackofficeCourseMother.random()];

      await Promise.all(courses.map(async course => repository.save(course)));

      const expectedCourses = await repository.searchAll();

      expect(courses.length).toEqual(expectedCourses.length);
      expect(courses.sort(sort)).toEqual(expectedCourses.sort(sort));
    });
  });
});

function sort(backofficeCourse1: BackofficeCourse, backofficeCourse2: BackofficeCourse): number {
  return backofficeCourse1?.id?.value.localeCompare(backofficeCourse2?.id?.value);
}
