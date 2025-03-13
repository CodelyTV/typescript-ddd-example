import { NumberValueObject } from './value-object/IntValueObject';
import { InvalidArgumentError } from './value-object/InvalidArgumentError';

export class MonthNumericValue extends NumberValueObject {
  private static readonly MIN_VALUE = 0;
  private static readonly MAX_VALUE = 11;

  constructor(value: number) {
    super(value);
    this.ensureValidValue(value);
  }

  static create(value: number): MonthNumericValue {
    return new MonthNumericValue(value);
  }

  private ensureValidValue(value: number) {
    if (value < MonthNumericValue.MIN_VALUE || value > MonthNumericValue.MAX_VALUE) {
      throw new InvalidArgumentError(`[${value}] is not a valid numeric value for Month.`);
    }
  }
}
