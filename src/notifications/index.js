import * as Notifications from 'expo-notifications';

export async function allowsNotificationsAsync() {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted || settings.ios.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

export async function requestPermissionsAsync() {
  const notificationPermissionsStatus = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowSound: true,
    },
  });
  return notificationPermissionsStatus;
}

export function createNotificationRequest({ identifier = null, content, trigger }) {
  return {
    identifier,
    content, // NotificationContentInput
    trigger, // NotificationTriggerInput
  };
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true, // TODO: pull this from Notification?
    shouldSetBadge: true,
  }),
});

export async function scheduleLocalNotification(notificationRequestInput) {
  return Notifications.scheduleNotificationAsync(notificationRequestInput);
}

export async function cancelScheduledNotification(notificationId) {
  return Notifications.cancelScheduledNotificationAsync(notificationId);
}
