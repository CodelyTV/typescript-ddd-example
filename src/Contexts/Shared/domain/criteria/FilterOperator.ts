import { EnumValueObject } from '../value-object/EnumValueObject';
import { InvalidArgumentError } from '../value-object/InvalidArgumentError';

export enum Operator {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GT = '>',
  LT = '<',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS'
}

export class FilterOperator extends EnumValueObject<Operator> {
  constructor(value: Operator) {
    super(value, Object.values(Operator));
  }

  static fromValue(value: string): FilterOperator {
    switch (value) {
      case Operator.EQUAL:
        return new FilterOperator(Operator.EQUAL);
      case Operator.NOT_EQUAL:
        return new FilterOperator(Operator.NOT_EQUAL);
      case Operator.GT:
        return new FilterOperator(Operator.GT);
      case Operator.LT:
        return new FilterOperator(Operator.LT);
      case Operator.CONTAINS:
        return new FilterOperator(Operator.CONTAINS);
      case Operator.NOT_CONTAINS:
        return new FilterOperator(Operator.NOT_CONTAINS);
      default:
        throw new InvalidArgumentError(`The filter operator ${value} is invalid`);
    }
  }

  public isPositive(): boolean {
    return this.value !== Operator.NOT_EQUAL && this.value !== Operator.NOT_CONTAINS;
  }

  protected throwErrorForInvalidValue(value: Operator): void {
    throw new InvalidArgumentError(`The filter operator ${value} is invalid`);
  }

  static equal() {
    return this.fromValue(Operator.EQUAL);
  }
}
