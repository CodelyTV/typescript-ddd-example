import { FileCourseRepository } from '../../../../../src/Contexts/Mooc/Courses/infrastructure/FileCourseRepository';
import { CourseMother } from '../domain/CourseMother';

describe('Save Course', () => {
  it('should have a course', async () => {
    const repository = new FileCourseRepository();
    const course = CourseMother.random();

    await repository.save(course);
  });
});

describe('Search Course', () => {
  it('should return an existing course', async () => {
    const repository = new FileCourseRepository();
    const course = CourseMother.random();

    await repository.save(course);

    expect(course).toEqual(await repository.search(course.id));
  });

  it('should not return a non existing course', async () => {
    const repository = new FileCourseRepository();

    expect(await repository.search(CourseMother.random().id)).toBeFalsy();
  });
});
