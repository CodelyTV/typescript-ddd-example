import { InvalidArgumentError } from '../value-object/InvalidArgumentError';

export enum OrderTypes {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none'
}

export class OrderType {
  readonly value: string;

  constructor(type: string) {
    this.value = type;
    this.ensureIsBetweenAcceptedValues(type);
  }

  static fromValue(value: string): OrderType {
    switch (value) {
      case OrderTypes.ASC:
        return new OrderType(OrderTypes.ASC);
      case OrderTypes.DESC:
        return new OrderType(OrderTypes.DESC);
      default:
        return new OrderType('');
    }
  }

  public isNone(): boolean {
    return this.value === OrderTypes.NONE;
  }

  public isAsc(): boolean {
    return this.value === OrderTypes.ASC;
  }

  private ensureIsBetweenAcceptedValues(value: string): void {
    const allOperators: string[] = Object.values(OrderTypes);
    const operatorsIncludeValue = allOperators.includes(value);

    if (!operatorsIncludeValue) {
      this.throwExceptionForInvalidValue(value);
    }
  }

  private throwExceptionForInvalidValue(value: string): void {
    throw new InvalidArgumentError(`The filter operator ${value} is invalid`);
  }
}
