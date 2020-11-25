import { BackofficeCourse } from '../../domain/BackofficeCourse';
import { BackofficeCourseDuration } from '../../domain/BackofficeCourseDuration';
import { BackofficeCourseId } from '../../domain/BackofficeCourseId';
import { BackofficeCourseName } from '../../domain/BackofficeCourseName';
import { BackofficeCourseRepository } from '../../domain/BackofficeCourseRepository';

export class BackofficeCourseCreator {
  constructor(private backofficeCourseRepository: BackofficeCourseRepository) {}

  async run(id: string, duration: string, name: string) {
    const course = new BackofficeCourse(
      new BackofficeCourseId(id),
      new BackofficeCourseName(name),
      new BackofficeCourseDuration(duration)
    );

    return this.backofficeCourseRepository.save(course);
  }
}
