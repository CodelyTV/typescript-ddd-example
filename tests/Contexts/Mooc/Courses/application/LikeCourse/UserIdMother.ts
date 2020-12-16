import { UserId } from '../../../../../../src/Contexts/Mooc/Courses/domain/UserId';
import { UuidMother } from '../../../../Shared/domain/UuidMother';

export class UserIdMother {
  static create(value: string): UserId {
    return new UserId(value);
  }

  static random(): UserId {
    return this.create(UuidMother.random());
  }
}
