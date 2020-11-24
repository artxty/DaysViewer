import {
  createNotificationRequest,
  scheduleLocalNotification,
  cancelScheduledNotification,
  allowsNotificationsAsync,
  requestPermissionsAsync,
} from './index';
import appInfoStorage from '../storage/appInfoStorage';

export async function cancelDailyNotification() {
  const dailyNotificationId = await appInfoStorage.get('dailyNotificationId');
  await cancelScheduledNotification(dailyNotificationId);
}

export async function setDailyNotification(time) {
  if (!await allowsNotificationsAsync()) {
    await requestPermissionsAsync();
  }

  const notificationRequest = createNotificationRequest({
    content: {
      title: 'How was your day? v2',
      body: 'Don\'t forget to rate it!',
      sound: true,
    },
    trigger: {
      // timezone: string, TODO: add user timezone
      repeats: true,
      hour: time.hours,
      minute: time.minutes,
    },
  });

  await cancelDailyNotification();
  const id = await scheduleLocalNotification(notificationRequest);
  await appInfoStorage.set('dailyNotificationId', id);
}
