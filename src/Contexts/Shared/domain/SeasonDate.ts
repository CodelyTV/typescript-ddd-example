import { MonthNumericValue } from './MonthNumericValue';
import { DayNumericValue } from './DayNumericValue';

export class SeasonDate {
  private static readonly YEAR: number = 1900;
  private readonly _value: Date;

  constructor(readonly month: MonthNumericValue, readonly day: DayNumericValue) {
    this._value = new Date(SeasonDate.YEAR, month.value, day.value);
  }

  static create(month: MonthNumericValue, day: DayNumericValue): SeasonDate {
    return new SeasonDate(month, day);
  }

  static from(date: Date) {
    return SeasonDate.create(MonthNumericValue.create(date.getMonth()), DayNumericValue.create(date.getDate()));
  }

  get value() {
    return this._value;
  }

  isGreaterThanOrEqualTo(date: SeasonDate): boolean {
    const month = this._value.getMonth();
    const day = this._value.getDate();

    const dateMonth = date.month.value;
    const dateDay = date.day.value;

    return month > dateMonth || (month === dateMonth && day >= dateDay);
  }

  isLessThanOrEqualTo(date: SeasonDate): boolean {
    const month = this._value.getMonth();
    const day = this._value.getDate();

    const dateMonth = date.month.value;
    const dateDay = date.day.value;

    return month < dateMonth || (month === dateMonth && day <= dateDay);
  }
}
