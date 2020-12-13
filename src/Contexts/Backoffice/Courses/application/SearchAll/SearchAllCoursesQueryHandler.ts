import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { CoursesFinder } from './CoursesFinder';
import { SearchAllCoursesQuery } from './SearchAllCoursesQuery';
import { SearchAllCoursesResponse } from './SearchAllCoursesResponse';

export class SearchAllCoursesQueryHandler implements QueryHandler<SearchAllCoursesQuery, SearchAllCoursesResponse> {
  constructor(private coursesFinder: CoursesFinder) {}

  subscribedTo(): Query {
    return SearchAllCoursesQuery;
  }

  async handle(_query: SearchAllCoursesQuery): Promise<SearchAllCoursesResponse> {
    return this.coursesFinder.run();
  }
}
