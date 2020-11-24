import {
  format,
  endOfMonth,
  eachDayOfInterval,
  differenceInCalendarMonths,
  isAfter,
} from 'date-fns';

export function getDateId(date = new Date()) {
  return date.toISOString().split('T')[0];
}

export function getMonthId(date = new Date()) {
  const startOfMonthDate = new Date(date);
  startOfMonthDate.setDate(1);
  return getDateId(startOfMonthDate);
}

export function getDateFromDateId(id = getDateId()) {
  const [year, month, day] = id.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function getEachDayIdInMonth(monthId = getMonthId()) {
  const firstDayOfMonth = getDateFromDateId(monthId);
  return eachDayOfInterval({
    start: firstDayOfMonth,
    end: endOfMonth(firstDayOfMonth),
  }).map(getDateId);
}

export {
  differenceInCalendarMonths,
  format,
  isAfter,
};
