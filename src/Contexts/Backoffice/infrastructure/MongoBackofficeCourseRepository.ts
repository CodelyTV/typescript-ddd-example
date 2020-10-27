import { MongoRepository } from '../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { BackofficeCourse } from '../domain/BackofficeCourse';
import { BackofficeCourseRepository } from '../domain/BackofficeCourseRepository';

export class MongoBackofficeCourseRepository extends MongoRepository<BackofficeCourse>
  implements BackofficeCourseRepository {
  protected moduleName(): string {
    return 'backofficeCourses';
  }

  async searchAll(): Promise<BackofficeCourse[]> {
    const collection = await this.collection();

    const documents = await collection.find({});

    const courses: Array<BackofficeCourse> = (await documents.toArray()).map(document =>
      BackofficeCourse.fromPrimitives({ ...document, id: document._id })
    );

    return courses;
  }

  async save(course: BackofficeCourse) {
    return this.persist(course.id.value, course);
  }
}
