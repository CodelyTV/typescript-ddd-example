import * as faker from 'faker';

export class MotherCreator {
  static random(): Faker.FakerStatic {
    return faker;
  }
}
