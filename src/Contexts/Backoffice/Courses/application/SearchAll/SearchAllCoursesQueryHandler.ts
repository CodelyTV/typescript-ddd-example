import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { BackofficeCoursesResponse } from '../BackofficeCoursesResponse';
import { CoursesFinder } from './CoursesFinder';
import { SearchAllCoursesQuery } from './SearchAllCoursesQuery';

export class SearchAllCoursesQueryHandler implements QueryHandler<SearchAllCoursesQuery, BackofficeCoursesResponse> {
  constructor(private coursesFinder: CoursesFinder) {}

  subscribedTo(): Query {
    return SearchAllCoursesQuery;
  }

  async handle(_query: SearchAllCoursesQuery): Promise<BackofficeCoursesResponse> {
    return this.coursesFinder.run();
  }
}
