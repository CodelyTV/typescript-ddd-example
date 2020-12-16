import { Nullable } from '../Nullable';
import { FilterField } from './FilterField';
import { FilterOperator } from './FilterOperator';
import { FilterValue } from './FilterValue';

export type FilterKeys = 'field' | 'operator' | 'value';

export class Filter {
  readonly field: FilterField;
  readonly operator: Nullable<FilterOperator>;
  readonly value: FilterValue;

  constructor(field: FilterField, operator: Nullable<FilterOperator>, value: FilterValue) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }

  static fromValues(values: Record<FilterKeys, string>): Filter {
    return new Filter(
      new FilterField(values.field),
      FilterOperator.fromValue(values.operator),
      new FilterValue(values.value)
    );
  }
}
