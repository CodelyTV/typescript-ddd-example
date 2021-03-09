import { StringValueObject } from '../value-object/StringValueObject';

export class FilterValue extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
