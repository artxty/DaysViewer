import React from 'react';
import PropTypes from 'prop-types';
import { InteractionManager } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import iosColors from 'ios-colors';

import {
  isAfter,
  getDateId,
  getMonthId,
  getDateFromDateId,
} from '../helpers/date';
import { RATING_COLOR_MAP } from '../constants/Colors';

export default function Calendar({
  days = {}, onScroll, onDayPress, pastMonthsRange,
}) {
  /* TODO: is there any other solution? */
  function getMarkedDates() {
    return Object.keys(days).reduce((formattedDays, dayId) => {
      const dayDate = getDateFromDateId(dayId);
      const currentDate = new Date();
      if (isAfter(dayDate, currentDate)) {
        return {
          ...formattedDays,
          [dayId]: {
            disableTouchEvent: true,
          },
        };
      }

      const rating = days[dayId] !== null ? days[dayId].rating : 0;
      const note = days[dayId] && days[dayId].note;
      return {
        ...formattedDays,
        [dayId]: {
          marked: !!note,
          dotColor: iosColors.systemGray.light,
          selected: true,
          selectedColor: RATING_COLOR_MAP[rating],
        },
      };
    }, {});
  }

  function handleVisibleMonthsChange(months = []) {
    // TODO: add two-three extra months to hide loading?
    const visibleMonthsIds = months.map(({ year, month }) => {
      const monthDate = new Date(year, month - 1);
      return getMonthId(monthDate);
    });
    /*
      InteractionManager.runAfterInteractions is necessary here
      to solve an issue of months displaying:
      https://github.com/wix/react-native-calendars/issues/884
    */
    return InteractionManager.runAfterInteractions(() => onScroll(visibleMonthsIds));
  }

  function handleDayPress({ year, month, day }) {
    const dayDate = new Date(year, month - 1, day);
    const dayId = getDateId(dayDate);
    onDayPress(dayId);
  }

  return (
    <CalendarList
      /*
        Changing pastScrollRange dynamically doesn't re-render the component
        to force re-render 'key' prop need to be updated
        */
      key={pastMonthsRange}
      markedDates={getMarkedDates()}
      onVisibleMonthsChange={handleVisibleMonthsChange}
      onDayPress={handleDayPress}
      pastScrollRange={pastMonthsRange}
      futureScrollRange={0}
      displayLoadingIndicator
    />
  );
}

Calendar.propTypes = {
  onScroll: PropTypes.func.isRequired,
  onDayPress: PropTypes.func.isRequired,
  days: PropTypes.shape({
    rating: PropTypes.number,
    note: PropTypes.string,
  }).isRequired,
  pastMonthsRange: PropTypes.number.isRequired,
};
