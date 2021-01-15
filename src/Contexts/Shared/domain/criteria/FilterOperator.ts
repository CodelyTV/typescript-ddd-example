import { EnumValueObject } from '../value-object/EnumValueObject';
import { InvalidArgumentError } from '../value-object/InvalidArgumentError';

export enum FilterOperators {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GT = '>',
  LT = '<',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS'
}

export class FilterOperator extends EnumValueObject<FilterOperators> {
  constructor(value: FilterOperators) {
    super(value, Object.values(FilterOperators));
  }

  static fromValue(value: string): FilterOperator {
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
        throw new InvalidArgumentError(`The filter operator ${value} is invalid`);
    }
  }

  public isPositive(): boolean {
    return this.value !== FilterOperators.NOT_EQUAL && this.value !== FilterOperators.NOT_CONTAINS;
  }

  protected throwErrorForInvalidValue(value: FilterOperators): void {
    throw new InvalidArgumentError(`The filter operator ${value} is invalid`);
  }
}
