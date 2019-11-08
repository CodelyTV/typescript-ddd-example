export default class Course {
  private _id: string;
  private _name: string;
  private _duration: string;

  constructor(id: string, name: string, duration: string) {
    this._id = id;
    this._name = name;
    this._duration = duration;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get duration(): string {
    return this._duration;
  }
}
