import container from '../../../../../src/apps/backoffice/backend/config/dependency-injection';
import { BackofficeCourse } from '../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourse';
import { MongoBackofficeCourseRepository } from '../../../../../src/Contexts/Backoffice/Courses/infrastructure/persistence/MongoBackofficeCourseRepository';
import { EnvironmentArranger } from '../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { BackofficeCourseMother } from '../domain/BackofficeCourseMother';

const repository: MongoBackofficeCourseRepository = container.get('Backoffice.courses.BackofficeCourseRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('Backoffice.Backend.EnvironmentArranger');

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).close();
});

describe('MongoBackofficeCourseRepository', () => {
  describe('#searchAll', () => {
    it('should return the existing courses', async () => {
      const courses = [BackofficeCourseMother.random(), BackofficeCourseMother.random()];

      await Promise.all(courses.map(course => repository.save(course)));

      const expectedCourses = await repository.searchAll();
      expect(courses.sort(sort)).toStrictEqual(expectedCourses.sort(sort));
    });

    it('should save a course', async () => {
      const course = BackofficeCourseMother.random();

      await repository.save(course);
      expect(await repository.searchAll()).toContainEqual(course);
    });
  });
});

function sort(backofficeCourse1: BackofficeCourse, backofficeCourse2: BackofficeCourse): number {
  return backofficeCourse1?.id?.value.localeCompare(backofficeCourse2?.id?.value);
}
