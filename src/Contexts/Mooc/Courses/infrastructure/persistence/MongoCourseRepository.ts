import { Collection } from 'mongodb';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { Course } from '../../domain/Course';
import { CourseDuration } from '../../domain/CourseDuration';
import { CourseName } from '../../domain/CourseName';
import { CourseRepository } from '../../domain/CourseRepository';
import { CourseDocument } from './mongo/CourseDocument';

export class MongoCourseRepository extends MongoRepository<CourseDocument> implements CourseRepository {
  public async save(course: Course): Promise<void> {
    const document = toPersistence(course);

    const collection = await this.coursesCollection();

    await this.persist(document, collection);
  }

  private async coursesCollection(): Promise<Collection<CourseDocument>> {
    return this.collection('courses');
  }

  public async search(id: CourseId): Promise<Nullable<Course>> {
    const collection = await this.coursesCollection();

    const document = await collection.findOne({ _id: id.value });

    return document ? toDomain(document) : null;
  }
}

const toPersistence = (source: Course): CourseDocument => ({
  _id: source.id.value,
  name: source.name.value,
  duration: source.duration.value
});

const toDomain = (source: CourseDocument): Course =>
  new Course(new CourseId(source._id), new CourseName(source.name), new CourseDuration(source.duration));
