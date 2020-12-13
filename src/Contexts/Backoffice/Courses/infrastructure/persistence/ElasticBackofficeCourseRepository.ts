import { ElasticRepository } from '../../../../Shared/infrastructure/persistence/elasticsearch/ElasticRepository';
import { BackofficeCourse } from '../../domain/BackofficeCourse';
import { BackofficeCourseRepository } from '../../domain/BackofficeCourseRepository';

type ElasticBackofficeCourseDocument = { _source: { id: string; duration: string; name: string } };

export class ElasticBackofficeCourseRepository
  extends ElasticRepository<BackofficeCourse>
  implements BackofficeCourseRepository {
  protected moduleName(): string {
    return 'backofficecourses';
  }

  async searchAll(): Promise<BackofficeCourse[]> {
    const client = await this.client();

    const response = await client.search({
      index: this.moduleName(),
      body: {
        query: {
          match_all: {}
        }
      }
    });

    return response.body.hits.hits.map((hit: ElasticBackofficeCourseDocument) =>
      BackofficeCourse.fromPrimitives({ ...hit._source })
    );
  }

  async save(course: BackofficeCourse): Promise<void> {
    return this.persist(this.moduleName(), course);
  }
}
