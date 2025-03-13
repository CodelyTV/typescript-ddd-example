import { Season } from './Season';
import { HemisphereLocation } from './HemisphereLocation';
import { SeasonDate } from './SeasonDate';
import { MonthNumericValue } from './MonthNumericValue';
import { DayNumericValue } from './DayNumericValue';
import { SeasonDatesRange } from './SeasonDatesRange';

export abstract class Seasons {
  static get(): Season[] {
    return [
      Season.create('north', 'winter', Seasons.decemberToMarchSeasonDatesRange()),
      Season.create('north', 'spring', Seasons.marchToJuneSeasonDatesRange()),
      Season.create('north', 'summer', Seasons.juneToSeptemberSeasonDatesRange()),
      Season.create('north', 'autumn', Seasons.septemberToDecemberSeasonDatesRange()),
      Season.create('south', 'summer', Seasons.decemberToMarchSeasonDatesRange()),
      Season.create('south', 'autumn', Seasons.marchToJuneSeasonDatesRange()),
      Season.create('south', 'winter', Seasons.juneToSeptemberSeasonDatesRange()),
      Season.create('south', 'spring', Seasons.septemberToDecemberSeasonDatesRange())
    ];
  }

  static of(hemisphereLocation: HemisphereLocation): Season[] {
    return Seasons.get().filter(season => {
      return season.hemisphereLocation === hemisphereLocation;
    });
  }

  private static decemberToMarchSeasonDatesRange(): SeasonDatesRange {
    return {
      startDate: SeasonDate.create(MonthNumericValue.create(11), DayNumericValue.create(21)),
      endDate: SeasonDate.create(MonthNumericValue.create(2), DayNumericValue.create(19))
    };
  }

  private static marchToJuneSeasonDatesRange(): SeasonDatesRange {
    return {
      startDate: SeasonDate.create(MonthNumericValue.create(2), DayNumericValue.create(20)),
      endDate: SeasonDate.create(MonthNumericValue.create(5), DayNumericValue.create(20))
    };
  }

  private static juneToSeptemberSeasonDatesRange(): SeasonDatesRange {
    return {
      startDate: SeasonDate.create(MonthNumericValue.create(5), DayNumericValue.create(21)),
      endDate: SeasonDate.create(MonthNumericValue.create(8), DayNumericValue.create(22))
    };
  }

  private static septemberToDecemberSeasonDatesRange(): SeasonDatesRange {
    return {
      startDate: SeasonDate.create(MonthNumericValue.create(8), DayNumericValue.create(23)),
      endDate: SeasonDate.create(MonthNumericValue.create(11), DayNumericValue.create(20))
    };
  }
}
