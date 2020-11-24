import React from 'react';

import NotificationsListItem from '../../components/NotificationsListItem';
import PastMonthsRangeListItem from '../../components/PastMothsRangeListItem';

export default function getSettingsSection(useDailyNotification, usePastMonthsRange) {
  return {
    title: 'Settings',
    data: [
      /* Notifications */
      <NotificationsListItem hook={useDailyNotification} />,
      /* Past months range */
      <PastMonthsRangeListItem hook={usePastMonthsRange} />,
      /* Next one */
      // <ListItem label="DarkMode">
      //   <Text>text</Text>
      // </ListItem>,
    ],
  };
}
