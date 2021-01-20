import { Criteria } from '../../../../Shared/domain/criteria/Criteria';
import { ElasticRepository } from '../../../../Shared/infrastructure/persistence/elasticsearch/ElasticRepository';
import { BackofficeCourse } from '../../domain/BackofficeCourse';
import { BackofficeCourseRepository } from '../../domain/BackofficeCourseRepository';
import config from '../config';

export class ElasticBackofficeCourseRepository
  extends ElasticRepository<BackofficeCourse>
  implements BackofficeCourseRepository {
  protected moduleName(): string {
    return config.get('elastic.indexName');
  }

  async searchAll(): Promise<BackofficeCourse[]> {
    return this.searchAllInElastic(BackofficeCourse.fromPrimitives);
  }

  async save(course: BackofficeCourse): Promise<void> {
    return this.persist(course);
  }

  async matching(criteria: Criteria): Promise<BackofficeCourse[]> {
    return this.searchByCriteria(criteria, BackofficeCourse.fromPrimitives);
  }
}
