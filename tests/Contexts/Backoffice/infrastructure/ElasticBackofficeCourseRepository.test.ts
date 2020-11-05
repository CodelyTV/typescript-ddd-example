import { ElasticBackofficeCourseRepository } from '../../../../src/Contexts/Backoffice/infrastructure/ElasticBackofficeCourseRepository';
import { ElasticClientFactory } from '../../../../src/Contexts/Shared/infrastructure/persistence/elasticsearch/ElasticClientFactory';
import { ElasticEnvironmentArranger } from '../../Shared/infrastructure/elastic/ElasticEnvironmentArranger';
import { BackofficeCourseMother } from '../application/domain/BackofficeCourseMother';
import { BackofficeCourse } from '../../../../src/Contexts/Backoffice/domain/BackofficeCourse';

const client = ElasticClientFactory.createClient('test');
const repository: ElasticBackofficeCourseRepository = new ElasticBackofficeCourseRepository(client);
const environmentArranger = new ElasticEnvironmentArranger(client);

function sort(backofficeCourse1: BackofficeCourse, backofficeCourse2: BackofficeCourse): number {
  return backofficeCourse1?.id?.value.localeCompare(backofficeCourse2?.id?.value);
}

afterEach(async () => {
  await environmentArranger.arrange();
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
