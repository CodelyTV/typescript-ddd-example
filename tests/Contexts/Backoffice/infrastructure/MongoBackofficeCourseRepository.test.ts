import container from '../../../../src/apps/backoffice/backend/config/dependency-injection';
import { MongoBackofficeCourseRepository } from '../../../../src/Contexts/Backoffice/infrastructure/MongoBackofficeCourseRepository';
import { EnvironmentArranger } from '../../Shared/infrastructure/arranger/EnvironmentArranger';
import { BackofficeCourseMother } from '../application/domain/BackofficeCourseMother';

const repository: MongoBackofficeCourseRepository = container.get('Backoffice.Backend.courses.BackofficeCourseRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('Backoffice.Backend.EnvironmentArranger');

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).close();
});

describe('Mongo BackofficeCourse Repository', () => {
  it('should return the existing courses', async () => {
    const courses = [BackofficeCourseMother.random(), BackofficeCourseMother.random()];

    await Promise.all(courses.map(course => repository.save(course)));
    
    const expectedCourses = await repository.searchAll();
    expect(courses.sort()).toStrictEqual(expectedCourses.sort());
  });

  it('should save a course', async () => {
    const course = BackofficeCourseMother.random();

    await repository.save(course);
    expect(await repository.searchAll()).toContainEqual(course);
  });
});
