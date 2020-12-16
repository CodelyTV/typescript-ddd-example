import { NumberValueObject } from '../value-object/IntValueObject';
import { Filters } from './Filters';
import { Order } from './Order';

export class Criteria {
  readonly filters: Filters;
  readonly order: Order;
  readonly limit?: NumberValueObject;
  readonly offset?: NumberValueObject;

  constructor(filters: Filters, order: Order, limit?: NumberValueObject, offset?: NumberValueObject) {
    this.filters = filters;
    this.order = order;
    this.limit = limit;
    this.offset = offset;
  }

  public hasFilters(): boolean {
    return this.filters.filters.length > 0;
  }
}
