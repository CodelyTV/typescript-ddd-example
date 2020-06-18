import { Query } from './Query';

export interface QueryBus {
  ask<T>(query: Query): Promise<T>;
}