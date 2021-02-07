import { BackofficeCourseId } from './BackofficeCourseId';

export class BackofficeCourseAlreadyExists extends Error {
  constructor(id: BackofficeCourseId) {
    super(`Course with id ${id} already exists`);
  }
}
