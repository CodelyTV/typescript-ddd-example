import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { Course } from '../../domain/Course';
import { CourseRepository } from '../../domain/CourseRepository';

export class MongoCourseRepository extends MongoRepository<Course> implements CourseRepository {
  public save(course: Course): Promise<void> {
    return this.persist(course.id.value, course);
  }

  public async search(id: CourseId): Promise<Nullable<Course>> {
    const collection = await this.collection();

    const document = await collection.findOne({ _id: id.value });

    return document ? Course.fromPrimitives({ ...document, id: id.value }) : null;
  }

  public async getAll(): Promise<Course[]> {
    const collection = await this.collection();

    const documents = await collection.find().toArray();
    
    const courses : Course[] = [];
    documents.forEach((document: any) =>  document ? courses.push(Course.fromPrimitives({...document, id: document._id})) : undefined);
    
    return courses;
  }

  protected moduleName(): string {
    return 'courses';
  }
}
