import { Criteria } from '../../../../Shared/domain/criteria/Criteria';
import { ElasticRepository } from '../../../../Shared/infrastructure/persistence/elasticsearch/ElasticRepository';
import { BackofficeCourse } from '../../domain/BackofficeCourse';
import { BackofficeCourseRepository } from '../../domain/BackofficeCourseRepository';

export class ElasticBackofficeCourseRepository
  extends ElasticRepository<BackofficeCourse>
  implements BackofficeCourseRepository {
  async searchAll(): Promise<BackofficeCourse[]> {
    return this.searchAllInElastic(BackofficeCourse.fromPrimitives);
  }

  async save(course: BackofficeCourse): Promise<void> {
    const currentCourse = await this.findById(course.id.value, BackofficeCourse.fromPrimitives);
    if (currentCourse) {
      return this.update(course.id.value, course);
    }

    return this.persist(course.id.value, course);
  }

  async matching(criteria: Criteria): Promise<BackofficeCourse[]> {
    return this.searchByCriteria(criteria, BackofficeCourse.fromPrimitives);
  }
}
