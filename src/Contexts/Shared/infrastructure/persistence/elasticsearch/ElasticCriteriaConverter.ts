import bodybuilder, { Bodybuilder } from 'bodybuilder';
import { Criteria } from '../../../domain/criteria/Criteria';
import { Filter } from '../../../domain/criteria/Filter';
import { FilterOperators } from '../../../domain/criteria/FilterOperator';
import { Filters } from '../../../domain/criteria/Filters';

export enum TypeQueryEnum {
  TERMS = 'terms',
  MATCH = 'match',
  MATCH_ALL = 'match_all',
  RANGE = 'range'
}

type QueryObject = { type: TypeQueryEnum; field: string; value: string | object };

interface FunctionTransformer<T, K> {
  (value: T): K;
}

export class ElasticCriteriaConverter {
  private queryTransformers: Map<FilterOperators, FunctionTransformer<Filter, QueryObject>>;

  constructor() {
    this.queryTransformers = new Map<FilterOperators, FunctionTransformer<Filter, QueryObject>>([
      [FilterOperators.EQUAL, this.termsQuery],
      [FilterOperators.NOT_EQUAL, this.termsQuery],
      [FilterOperators.GT, this.greaterThanQuery],
      [FilterOperators.LT, this.lowerThanQuery],
      [FilterOperators.CONTAINS, this.matchQuery],
      [FilterOperators.NOT_CONTAINS, this.matchQuery]
    ]);
  }

  public convert(criteria: Criteria): Bodybuilder {
    let body = bodybuilder();

    body.from(criteria.offset || 0);
    body.size(criteria.limit || 1000);

    if (criteria.order.hasOrder()) {
      body.sort(criteria.order.orderBy.value, criteria.order.orderType.value);
    }

    if (criteria.hasFilters()) {
      body = this.generateQuery(body, criteria.filters);
    }

    return body;
  }

  protected generateQuery(body: Bodybuilder, filters: Filters): Bodybuilder {
    filters.filters.map(filter => {
      const { type, value, field } = this.queryForFilter(filter);

      if (filter.operator.isPositive()) {
        body.query(type, field, value);
      } else {
        body.notQuery(type, field, value);
      }
    });

    return body;
  }

  private queryForFilter(filter: Filter): QueryObject {
    const functionToApply = this.queryTransformers.get(filter.operator.value);

    if (!functionToApply) {
      throw Error(`Unexpected operator value ${filter.operator.value}`);
    }

    return functionToApply(filter);
  }

  private termsQuery(filter: Filter): QueryObject {
    return { type: TypeQueryEnum.TERMS, field: filter.field.value, value: [filter.value.value] };
  }

  private greaterThanQuery(filter: Filter): QueryObject {
    return { type: TypeQueryEnum.RANGE, field: filter.field.value, value: { gt: filter.value.value } };
  }

  private lowerThanQuery(filter: Filter): QueryObject {
    return { type: TypeQueryEnum.RANGE, field: filter.field.value, value: { lt: filter.value.value } };
  }

  private matchQuery(filter: Filter): QueryObject {
    return { type: TypeQueryEnum.MATCH, field: filter.field.value, value: filter.value.value };
  }
}
