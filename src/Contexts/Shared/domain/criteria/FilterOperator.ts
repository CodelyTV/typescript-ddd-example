import { Nullable } from '../Nullable';

export enum FilterOperators {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GT = '>',
  LT = '<',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS'
}

export class FilterOperator {
  readonly value: FilterOperators;

  constructor(value: FilterOperators) {
    this.value = value;
  }

  static fromValue(value: string): Nullable<FilterOperator> {
    switch (value) {
      case FilterOperators.EQUAL:
        return new FilterOperator(FilterOperators.EQUAL);
      case FilterOperators.NOT_EQUAL:
        return new FilterOperator(FilterOperators.NOT_EQUAL);
      case FilterOperators.GT:
        return new FilterOperator(FilterOperators.GT);
      case FilterOperators.LT:
        return new FilterOperator(FilterOperators.LT);
      case FilterOperators.CONTAINS:
        return new FilterOperator(FilterOperators.CONTAINS);
      case FilterOperators.NOT_CONTAINS:
        return new FilterOperator(FilterOperators.NOT_CONTAINS);
      default:
        return null;
    }
  }

  public isPositive(): boolean {
    return this.value !== FilterOperators.NOT_EQUAL && this.value !== FilterOperators.NOT_CONTAINS;
  }
}
