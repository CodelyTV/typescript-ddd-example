import container from '../../../../../src/apps/mooc_backend/config/dependency-injection';
import { CoursesCounterRepository } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterRepository';
import { EnvironmentArranger } from '../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { CoursesCounterMother } from '../domain/CoursesCounterMother';

const environmentArranger: Promise<EnvironmentArranger> = container.get('Mooc.EnvironmentArranger');
const repository: CoursesCounterRepository = container.get('Mooc.coursesCounter.CoursesCounterRepository');

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).close();
});

describe('Save CoursesCounter', () => {
  it('should save a courses counter', async () => {
    const course = CoursesCounterMother.random();

    await repository.save(course);
  });
});

describe('Search CoursesCounter', () => {
  it('should return an existing course', async () => {
    const counter = CoursesCounterMother.random();

    await repository.save(counter);

    expect(counter).toEqual(await repository.search());
  });

  it('should not return null if there is no courses counter', async () => {
    expect(await repository.search()).toBeFalsy();
  });
});
