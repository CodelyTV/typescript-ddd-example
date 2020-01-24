import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';

export class CourseName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan30Characters(value);
  }

  private ensureLengthIsLessThan30Characters(value: string): void {
    if (value.length > 30) {
      throw new InvalidArgumentError(`The Course Name <${value}> has more than 30 characters`);
    }
  }
}
