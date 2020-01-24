export class CourseAlreadyExists extends Error {
  constructor(id: string) {
    super(`Course ${id} already exists`);
  }
}
