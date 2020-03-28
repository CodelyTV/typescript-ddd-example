import { IntegerMother } from './IntegerMother';
export class Repeater {
  static random(callable: Function) {
    return Array(IntegerMother.random(20))
      .fill({})
      .map(() => callable());
  }
}
