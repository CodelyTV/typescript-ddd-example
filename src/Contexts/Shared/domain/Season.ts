import { HemisphereLocation } from './HemisphereLocation';
import { SeasonName } from './SeasonName';
import { SeasonDatesRange } from './SeasonDatesRange';
import { SeasonDate } from './SeasonDate';

export class Season {
  constructor(
    readonly hemisphereLocation: HemisphereLocation,
    readonly name: SeasonName,
    readonly datesRange: SeasonDatesRange
  ) {}

  static create(hemisphereLocation: HemisphereLocation, name: SeasonName, datesRange: SeasonDatesRange): Season {
    return new Season(hemisphereLocation, name, datesRange);
  }

  startDate(): SeasonDate {
    return this.datesRange.startDate;
  }

  endDate(): SeasonDate {
    return this.datesRange.endDate;
  }

  isDateWithin(date: Date): boolean {
    const seasonDate = SeasonDate.from(date);
    const seasonStartDate = this.startDate();
    const seasonEndDate = this.endDate();

    return seasonDate.isGreaterThanOrEqualTo(seasonStartDate) || seasonDate.isLessThanOrEqualTo(seasonEndDate);
  }
}
