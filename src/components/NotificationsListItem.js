import React from 'react';
import PropTypes from 'prop-types';
import { Switch, StyleSheet } from 'react-native';

import iosColors from 'ios-colors';
import ListItem from './MoreListItem';
import TimePickerListItem from './TimePickerListItem';
import { setDailyNotification, cancelDailyNotification } from '../notifications/dailyNotification';

const styles = StyleSheet.create({
  subItem: {
    borderTopColor: iosColors.systemGray3.light,
    borderTopWidth: 0.5,
    paddingTop: 10,
    marginTop: 10,
  },
});

export default function NotificationsListItem({ hook }) {
  const [notifications, setNotifications] = hook;

  async function handleNotificationsSettingsChange(newSettings) {
    await setNotifications({ ...notifications, ...newSettings });
    if (notifications.isActive) {
      await setDailyNotification(notifications.time);
    } else {
      await cancelDailyNotification();
    }
  }

  const handleIsActiveChange = (value) => handleNotificationsSettingsChange({ isActive: value });
  const handleTimeChange = (value) => handleNotificationsSettingsChange({ time: value });

  return (
    <>
      <ListItem label="Notifications">
        <Switch value={notifications.isActive} onValueChange={handleIsActiveChange} />
      </ListItem>
      {notifications.isActive ? (
        <TimePickerListItem
          style={styles.subItem}
          value={notifications.time}
          onChange={handleTimeChange}
        />
      ) : null}
    </>
  );
}

NotificationsListItem.propTypes = {
  hook: PropTypes.arrayOf(PropTypes.any).isRequired,
};
