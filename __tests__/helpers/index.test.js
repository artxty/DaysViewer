import {
  getDateId,
  getMonthId,
  getDateFromDateId,
  getEachDayIdInMonth,
} from '../../src/helpers/date';

describe('Helpers', () => {
  test('getDateId', () => {
    const date = new Date(2020, 0, 5);
    const dateId = '2020-01-05';
    expect(getDateId(date)).toBe(dateId);
  });

  test('getMonthId should return dateId of first day of month', () => {
    const date = new Date(2020, 5, 22);
    const dateId = '2020-06-01';
    expect(getMonthId(date)).toBe(dateId);
  });

  test('getDateFromDateId', () => {
    const dateId = '2020-06-01';
    const date = new Date(2020, 5, 1);
    expect(getDateFromDateId(dateId)).toEqual(date);
  });

  test('getEachDayIdInMonth', () => {
    const monthId = '2020-01-01';
    const daysIds = [];
    for (let day = 1; daysIds.length < 31; day += 1) {
      const hasZeroPrefix = Math.floor(Math.log10(day)) === 0;
      daysIds.push(`2020-01-${hasZeroPrefix ? `0${day}` : day}`);
    }
    expect(getEachDayIdInMonth(monthId)).toEqual(daysIds);
  });
});
