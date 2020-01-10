import { CourseRepository } from '../domain/CourseRepository';
import { Course } from '../domain/Course';
import { CreateCourseRequest } from './CreateCourseRequest';
import { CourseId } from '../../Shared/domain/Courses/CourseId';

export class CourseCreator {
  private repository: CourseRepository;

  constructor(repository: CourseRepository) {
    this.repository = repository;
  }

  async run(request: CreateCourseRequest): Promise<void> {
    const course = new Course(new CourseId(request.id), request.name, request.duration);

    return this.repository.save(course);
  }
}
