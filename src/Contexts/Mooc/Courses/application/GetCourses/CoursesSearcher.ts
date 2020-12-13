import { CourseFinder as DomainCourseFinder } from '../../domain/CourseFinder';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { CourseResponse } from '../../../Shared/domain/Courses/application/CourseResponse';
import { CourseRepository } from '../../domain/CourseRepository';
import { Course } from '../../domain/Course';
import { CoursesResponse } from './CoursesResponse';
import { Nullable } from '../../../../Shared/domain/Nullable';

export class CoursesSearcher {
  private repository: CourseRepository;

  constructor(repository: CourseRepository) {
    this.repository = repository;
  }

  async run(): Promise<CoursesResponse> {
    const courses : Nullable<Course[]> = await this.repository.getAll();
    return new CoursesResponse(courses);
  }
}
