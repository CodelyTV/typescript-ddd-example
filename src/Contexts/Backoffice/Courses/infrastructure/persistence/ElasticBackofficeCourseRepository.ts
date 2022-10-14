import { Criteria } from '../../../../Shared/domain/criteria/Criteria';
import { ElasticRepository } from '../../../../Shared/infrastructure/persistence/elasticsearch/ElasticRepository';
import { BackofficeCourse } from '../../domain/BackofficeCourse';
import { BackofficeCourseRepository } from '../../domain/BackofficeCourseRepository';

export class ElasticBackofficeCourseRepository
  extends ElasticRepository<BackofficeCourse>
  implements BackofficeCourseRepository
{
  async searchAll(): Promise<BackofficeCourse[]> {
    return this.searchAllInElastic(BackofficeCourse.fromPrimitives);
  }

  async save(course: BackofficeCourse): Promise<void> {
    return this.persist(course.id.value, course);
  }

  async matching(criteria: Criteria): Promise<BackofficeCourse[]> {
    return this.searchByCriteria(criteria, BackofficeCourse.fromPrimitives);
  }
}
