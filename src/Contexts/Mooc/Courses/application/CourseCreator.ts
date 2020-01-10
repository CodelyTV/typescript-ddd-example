import { CourseRepository } from '../domain/CourseRepository';
import { Course } from '../domain/Course';
import { CreateCourseRequest } from './CreateCourseRequest';

export class CourseCreator {
  private repository: CourseRepository;

  constructor(repository: CourseRepository) {
    this.repository = repository;
  }

  async run(request: CreateCourseRequest): Promise<void> {
    const course = new Course(request.id, request.name, request.duration);

    return this.repository.save(course);
  }
}
