import { OrderBy } from './OrderBy';
import { OrderType, OrderTypes } from './OrderType';

export class Order {
  readonly orderBy: OrderBy;
  readonly orderType: OrderType;

  constructor(orderBy: OrderBy, orderType: OrderType) {
    this.orderBy = orderBy;
    this.orderType = orderType;
  }

  static fromValues(orderBy?: string, orderType?: string): Order {
    if (!orderBy) {
      return Order.none();
    }

    return new Order(new OrderBy(orderBy), OrderType.fromValue(orderType || OrderTypes.ASC));
  }

  static none(): Order {
    return new Order(new OrderBy(''), new OrderType(OrderTypes.NONE));
  }

  static desc(orderBy: string): Order {
    return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.DESC));
  }

  static asc(orderBy: string): Order {
    return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.ASC));
  }

  public hasOrder() {
    return !this.orderType.isNone();
  }
}
