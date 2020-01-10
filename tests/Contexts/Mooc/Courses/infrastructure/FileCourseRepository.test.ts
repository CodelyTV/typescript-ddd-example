import { FileCourseRepository } from '../../../../../src/Contexts/Mooc/Courses/infrastructure/FileCourseRepository';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';

describe('Save Course', () => {
  it('should have a course', async () => {
    const repository = new FileCourseRepository();
    const course = new Course(
      new CourseId('0766c602-d4d4-48b6-9d50-d3253123275e'),
      new CourseName('name'),
      new CourseDuration('duration')
    );

    await repository.save(course);
  });
});

describe('Search Course', () => {
  it('should return an existing course', async () => {
    const repository = new FileCourseRepository();
    const course = new Course(
      new CourseId('0766c602-d4d4-48b6-9d50-d3253123275e'),
      new CourseName('name'),
      new CourseDuration('duration')
    );

    await repository.save(course);

    expect(course).toEqual(await repository.search(course.id));
  });

  it('should not return a non existing course', async () => {
    const repository = new FileCourseRepository();

    expect(await repository.search(new CourseId('de8c20b5-1181-415b-bb82-1f15bf1b67f1'))).toBeFalsy();
  });
});
