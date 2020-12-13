import container from '../../../../../../src/apps/mooc_backend/config/dependency-injection';
import { Course } from '../../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseRepository } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { CourseMother } from '../../domain/CourseMother';

const repository: CourseRepository = container.get('Mooc.courses.CourseRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('Mooc.EnvironmentArranger');

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).close();
});

describe('Save Course', () => {
  it('should save a course', async () => {
    const course = CourseMother.random();

    await repository.save(course);
  });
});

describe('Search Course', () => {
  it('should return an existing course', async () => {
    const course = CourseMother.random();

    await repository.save(course);
    const response = await repository.search(course.id);

    expect(course).toEqual(response);
  });

  it('should not return a non existing course', async () => {
    expect(await repository.search(CourseMother.random().id)).toBeFalsy();
  });
});

describe('Get all Courses', () => {
  it('should return a list of existing courses', async () => {
    const firstCourse = CourseMother.random();
    const secondCourse = CourseMother.random();
    await repository.save(firstCourse);
    await repository.save(secondCourse);

    const response = await repository.getAll();

    const expected = [firstCourse, secondCourse];
    expect(expected).toEqual(response);
  });

  it('should return an empty list', async () => {
    const response = await repository.getAll();

    const expected : Course[] = [];
    expect(expected).toEqual(response);
  });
});