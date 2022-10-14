import container from '../../../../../src/apps/backoffice/backend/dependency-injection';
import { BackofficeCourse } from '../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourse';
import { BackofficeCourseRepository } from '../../../../../src/Contexts/Backoffice/Courses/domain/BackofficeCourseRepository';
import { EnvironmentArranger } from '../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { BackofficeCourseCriteriaMother } from '../domain/BackofficeCourseCriteriaMother';
import { BackofficeCourseMother } from '../domain/BackofficeCourseMother';

const repository: BackofficeCourseRepository = container.get('Backoffice.Courses.domain.BackofficeCourseRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('Backoffice.EnvironmentArranger');

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).close();
});

describe('BackofficeCourseRepository', () => {
  describe('#save', () => {
    it('should be able to persist the same course twice', async () => {
      const course = BackofficeCourseMother.random();

      await repository.save(course);
      await repository.save(course);

      const persistedCourses = await repository.searchAll();

      expect(persistedCourses).toHaveLength(1);
      expect(persistedCourses).toEqual([course]);
    });
  });

  describe('#searchAll', () => {
    it('should return the existing courses', async () => {
      const courses = [BackofficeCourseMother.random(), BackofficeCourseMother.random()];

      await Promise.all(courses.map(async course => repository.save(course)));

      const expectedCourses = await repository.searchAll();

      expect(courses).toHaveLength(expectedCourses.length);
      expect(courses.sort(sort)).toEqual(expectedCourses.sort(sort));
    });
  });
});

describe('#searchByCriteria', () => {
  it('should return all courses', async () => {
    const courses = [
      BackofficeCourseMother.withNameAndDuration('DDD in Typescript', '8 days'),
      BackofficeCourseMother.withNameAndDuration('DDD in Golang', '3 days'),
      BackofficeCourseMother.random()
    ];

    await Promise.all(courses.map(async course => repository.save(course)));
    const result = await repository.matching(BackofficeCourseCriteriaMother.whithoutFilter());

    expect(result).toHaveLength(3);
  });

  it('should return courses using a criteria sorting by id', async () => {
    const courses = [
      BackofficeCourseMother.withNameAndDuration('DDD in Typescript', '8 days'),
      BackofficeCourseMother.withNameAndDuration('DDD in Golang', '3 days'),
      BackofficeCourseMother.random()
    ];
    await Promise.all(courses.map(async course => repository.save(course)));
    
    const result = await repository.matching(
      BackofficeCourseCriteriaMother.nameAndDurationContainsSortAscById('DDD', 'days')
    );

    const expectedCourses = courses.slice(0, 2);
    expect(result).toHaveLength(2);
    expect(expectedCourses.sort(sort)).toEqual(result);
  });
});

function sort(backofficeCourse1: BackofficeCourse, backofficeCourse2: BackofficeCourse): number {
  return backofficeCourse1?.id?.value.localeCompare(backofficeCourse2?.id?.value);
}
