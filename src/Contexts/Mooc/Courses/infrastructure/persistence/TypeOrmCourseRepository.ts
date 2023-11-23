import { EntitySchema } from 'typeorm';
import { Nullable } from '@/Contexts/Shared/domain/Nullable';
import { TypeOrmRepository } from '@/Contexts/Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { Course } from '../../domain/Course';
import { CourseRepository } from '../../domain/CourseRepository';
import { CourseEntity } from './typeorm/CourseEntity';

export class TypeOrmCourseRepository extends TypeOrmRepository<Course> implements CourseRepository {
  public save(course: Course): Promise<void> {
    return this.persist(course);
  }

  public async search(id: CourseId): Promise<Nullable<Course>> {
    const repository = await this.repository();

    const course = await repository.findOne({ id });

    return course;
  }

  protected entitySchema(): EntitySchema<Course> {
    return CourseEntity;
  }

  public async searchAll(): Promise<Course[]> {
    const repository = await this.repository();

    const courses = await repository.find();

    return courses;
  }
}
