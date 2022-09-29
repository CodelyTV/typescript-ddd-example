import { MongoRepository } from '../../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { Nullable } from '../../../../../Shared/domain/Nullable';
import { CoursesCounter } from '../../../domain/CoursesCounter';
import { CoursesCounterRepository } from '../../../domain/CoursesCounterRepository';

interface CoursesCounterDocument {
  _id: string;
  total: number;
  existingCourses: string[];
}

export class MongoCoursesCounterRepository extends MongoRepository<CoursesCounter> implements CoursesCounterRepository {
  protected collectionName(): string {
    return 'coursesCounter';
  }

  public save(counter: CoursesCounter): Promise<void> {
    return this.persist(counter.id.value, counter);
  }

  public async search(): Promise<Nullable<CoursesCounter>> {
    const collection = await this.collection();

    const document = await collection.findOne<CoursesCounterDocument>({});
    return document ? CoursesCounter.fromPrimitives({ ...document, id: document._id }) : null;
  }
}
