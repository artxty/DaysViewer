import React from 'react';
import { Text, PlatformColor, Alert } from 'react-native';
import PropTypes from 'prop-types';

import appInfoStorage from '../storage/appInfoStorage';
import { differenceInCalendarMonths } from '../helpers/date';
import ListItem from './MoreListItem';

export default function pastMonthsRangeListItem({ hook }) {
  const [pastMonthsRange, setPastMonthsRange] = hook;

  return (
    <ListItem
      label="Past interval"
      onPress={() => Alert.alert(
        'Past interval',
        'Choose how many months are visible',
        [
          {
            text: '3 Months',
            onPress: () => setPastMonthsRange(3),
          },
          {
            text: '6 Months',
            onPress: () => setPastMonthsRange(6),
          },
          {
            text: '12 Months',
            onPress: () => setPastMonthsRange(12),
          },
          {
            text: 'Starting from the first app launch',
            onPress: async () => {
              const firstLaunch = await appInfoStorage.get('firstLaunch');
              return setPastMonthsRange(
                differenceInCalendarMonths(new Date(Date.now()), new Date(firstLaunch)) + 1,
              );
            },
          },
        ],
      )}
    >
      <Text style={{ color: PlatformColor('link'), fontSize: 18 }}>{`${pastMonthsRange} months`}</Text>
    </ListItem>
  );
}

pastMonthsRangeListItem.propTypes = {
  hook: PropTypes.arrayOf(PropTypes.any).isRequired,
};
