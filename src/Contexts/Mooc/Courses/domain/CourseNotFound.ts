export class CourseNotFound extends Error {
  constructor() {
    super('The course does not exists');
  }
}
