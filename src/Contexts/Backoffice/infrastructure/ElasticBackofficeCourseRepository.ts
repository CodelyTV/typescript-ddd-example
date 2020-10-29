import { ElasticRepository } from '../../Shared/infrastructure/persistence/elasticsearch/ElasticRepository';
import { BackofficeCourse } from '../domain/BackofficeCourse';
import { BackofficeCourseRepository } from '../domain/BackofficeCourseRepository';
import { Uuid } from '../../Shared/domain/value-object/Uuid';
import { BackofficeCourseName } from '../domain/BackofficeCourseName';
import { BackofficeCourseId } from '../domain/BackofficeCourseId';
import { BackofficeCourseDuration } from '../domain/BackofficeCourseDuration';

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

    // console.log(response.body.hits.hits);

    return response.body.hits.hits.map((hit: ElasticBackofficeCourseDocument) =>
      BackofficeCourse.fromPrimitives({ ...hit._source })
    );
  }

  async save(course: BackofficeCourse) {
    return this.persist(this.moduleName(), course);
  }

  async delete() {
    const client = await this.client();

    return client.deleteByQuery({
      index: this.moduleName(),
      body: {
        query: {
          match_all: {}
        }
      }
    });
  }
}
