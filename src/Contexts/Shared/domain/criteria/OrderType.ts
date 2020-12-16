export enum OrderTypes {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none'
}

export class OrderType {
  readonly value: string;

  constructor(type: OrderTypes) {
    this.value = type;
  }

  public isNone(): boolean {
    return this.value === OrderTypes.NONE;
  }

  public isAsc(): boolean {
    return this.value === OrderTypes.ASC;
  }
}
