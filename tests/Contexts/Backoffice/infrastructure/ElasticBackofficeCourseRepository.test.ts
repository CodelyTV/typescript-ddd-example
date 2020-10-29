import container from '../../../../src/apps/backoffice/backend/config/dependency-injection';
import { ElasticBackofficeCourseRepository } from '../../../../src/Contexts/Backoffice/infrastructure/ElasticBackofficeCourseRepository';
import { ElasticClientFactory } from '../../../../src/Contexts/Shared/infrastructure/persistence/elasticsearch/ElasticClientFactory';
import { EnvironmentArranger } from '../../Shared/infrastructure/arranger/EnvironmentArranger';
import { BackofficeCourseMother } from '../application/domain/BackofficeCourseMother';

const client = ElasticClientFactory.createClient('test');
const repository: ElasticBackofficeCourseRepository = new ElasticBackofficeCourseRepository(client);
const environmentArranger: Promise<EnvironmentArranger> = container.get('Backoffice.Backend.EnvironmentArranger');

beforeEach(async () => {
  await repository.delete();
});

afterAll(async () => {
  //   await repository.delete();
});

describe('Search all courses', () => {
  it('should return the existing courses', async () => {
    const courses = [BackofficeCourseMother.random(), BackofficeCourseMother.random()];
    await Promise.all(courses.map(course => repository.save(course)));
    const expectedCourses = await repository.searchAll();
    expect(courses.length).toEqual(expectedCourses.length);
    expect(courses.sort()).toEqual(expectedCourses.sort());
  });
});
