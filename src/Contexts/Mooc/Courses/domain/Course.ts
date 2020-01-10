export class Course {
  readonly id: string;
  readonly name: string;
  readonly duration: string;

  constructor(id: string, name: string, duration: string) {
    this.id = id;
    this.name = name;
    this.duration = duration;
  }
}
