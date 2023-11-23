import { Criteria } from '@/Contexts/Shared/domain/criteria/Criteria';
import { Filters } from '@/Contexts/Shared/domain/criteria/Filters';
import { Order } from '@/Contexts/Shared/domain/criteria/Order';
import { BackofficeCourseRepository } from '../../domain/BackofficeCourseRepository';
import { BackofficeCoursesResponse } from '../BackofficeCoursesResponse';

export class CoursesByCriteriaSearcher {
  constructor(private repository: BackofficeCourseRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<BackofficeCoursesResponse> {
    const criteria = new Criteria(filters, order, limit, offset);

    const courses = await this.repository.matching(criteria);

    return new BackofficeCoursesResponse(courses);
  }
}
