import { InvalidArgumentError } from './value-object/InvalidArgumentError';
import { NumberValueObject } from './value-object/IntValueObject';

export class DayNumericValue extends NumberValueObject {
  private static readonly MIN_VALUE = 1;
  private static readonly MAX_VALUE = 31;

  constructor(value: number) {
    super(value);
    this.ensureValidValue(value);
  }

  static create(value: number): DayNumericValue {
    return new DayNumericValue(value);
  }

  private ensureValidValue(value: number) {
    if (value < DayNumericValue.MIN_VALUE || value > DayNumericValue.MAX_VALUE) {
      throw new InvalidArgumentError(`[${value}] is not a valid numeric value for Day.`);
    }
  }
}
