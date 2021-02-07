import { Criteria } from '../../../../Shared/domain/criteria/Criteria';
import { Filters } from '../../../../Shared/domain/criteria/Filters';
import { Order } from '../../../../Shared/domain/criteria/Order';
import { BackofficeCourse } from '../../domain/BackofficeCourse';
import { BackofficeCourseAlreadyExists } from '../../domain/BackofficeCourseAlreadyExists';
import { BackofficeCourseDuration } from '../../domain/BackofficeCourseDuration';
import { BackofficeCourseId } from '../../domain/BackofficeCourseId';
import { BackofficeCourseName } from '../../domain/BackofficeCourseName';
import { BackofficeCourseRepository } from '../../domain/BackofficeCourseRepository';

export class BackofficeCourseCreator {
  constructor(private backofficeCourseRepository: BackofficeCourseRepository) {}

  async run(id: string, duration: string, name: string) {
    const course = new BackofficeCourse(
      new BackofficeCourseId(id),
      new BackofficeCourseName(name),
      new BackofficeCourseDuration(duration)
    );

    const criteria = this.buildCriteria(id);
    const alreadyExists = await this.courseAlreadyExists(criteria);
    if (alreadyExists) {
      throw new BackofficeCourseAlreadyExists(new BackofficeCourseId(id));
    }

    return this.backofficeCourseRepository.save(course);
  }

  private async courseAlreadyExists(criteria: Criteria) {
    const current = await this.backofficeCourseRepository.matching(criteria);
    return current.length > 0;
  }

  buildCriteria(id: string): Criteria {
    const filter = new Map<string, string>();
    filter.set('field', 'id');
    filter.set('operator', '=');
    filter.set('value', id);
    const filters = Filters.fromValues([filter]);
    return new Criteria(filters, Order.none());
  }
}
