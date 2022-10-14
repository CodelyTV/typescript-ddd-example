export interface NewableClass<T> extends Function {
  new (...args: any[]): T;
}
