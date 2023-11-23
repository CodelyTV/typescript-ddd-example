import { Query } from '@/Contexts/Shared/domain/Query';
import { QueryHandler } from '@/Contexts/Shared/domain/QueryHandler';
import { CoursesResponse } from './CoursesResponse';
import { CoursesFinder } from './CoursesFinder';
import { SearchAllCoursesQuery } from './SearchAllCoursesQuery';

export class SearchAllCoursesQueryHandler implements QueryHandler<SearchAllCoursesQuery, CoursesResponse> {
  constructor(private coursesFinder: CoursesFinder) {}

  subscribedTo(): Query {
    return SearchAllCoursesQuery;
  }

  async handle(_query: SearchAllCoursesQuery): Promise<CoursesResponse> {
    return this.coursesFinder.run();
  }
}
