import { BackofficeCourseId } from '../../../../../src/Contexts/Backoffice/domain/BackofficeCourseId';
import { UuidMother } from '../../../Shared/domain/UuidMother';

export class BackofficeCourseIdMother {
  static create(value: string): BackofficeCourseId {
    return new BackofficeCourseId(value);
  }

  static creator() {
    return () => BackofficeCourseIdMother.random();
  }

  static random(): BackofficeCourseId {
    return this.create(UuidMother.random());
  }
}
