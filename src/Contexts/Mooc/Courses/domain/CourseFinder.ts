import { CourseRepository } from './CourseRepository';
import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { Course } from './Course';
import { Nullable } from '../../../Shared/domain/Nullable';
import { CourseNotFound } from './CourseNotFound';

export class CourseFinder {
    private repository: CourseRepository;
  
    constructor(repository: CourseRepository) {
      this.repository = repository;
    }
  
    async run(courseId : CourseId): Promise<Course> {
      const course : Nullable<Course> = await this.repository.search(courseId);
      if (!course) {
        throw new CourseNotFound();
      }
      return course;
    }
  }