import { Filters } from '../../../../Shared/domain/criteria/Filters';
import { Order } from '../../../../Shared/domain/criteria/Order';
import { Query } from '../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { BackofficeCoursesResponse } from '../BackofficeCoursesResponse';
import { CoursesByCriteriaSearcher } from './CoursesByCriteriaSearcher';
import { SearchCoursesByCriteriaQuery } from './SearchCoursesByCriteriaQuery';

export class SearchCoursesByCriteriaQueryHandler
  implements QueryHandler<SearchCoursesByCriteriaQuery, BackofficeCoursesResponse>
{
  constructor(private searcher: CoursesByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchCoursesByCriteriaQuery;
  }

  handle(query: SearchCoursesByCriteriaQuery): Promise<BackofficeCoursesResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.run(filters, order, query.limit, query.offset);
  }
}
