import container from '../../../../../../src/apps/mooc/backend/config/dependency-injection';
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

describe('MongoCourseRepository', () => {
  describe('#save', () => {
    it('should save a course', async () => {
      const course = CourseMother.random();

      await repository.save(course);
    });
  });

  describe('#search', () => {
    it('should return an existing course', async () => {
      const course = CourseMother.random();

      await repository.save(course);

      expect(course).toEqual(await repository.search(course.id));
    });

    it('should not return a non existing course', async () => {
      expect(await repository.search(CourseMother.random().id)).toBeFalsy();
    });
  });
});
