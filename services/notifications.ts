import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const setupNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.warn('Notification permissions not granted');
  }
};

export const sendLocalNotification = async (
  title: string,
  body: string,
  data?: Record<string, any>
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: null,
  });
};

export const scheduleNotification = async (
  title: string,
  body: string,
  seconds: number,
  data?: Record<string, any>
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: { seconds },
  });
};

export default {
  setupNotifications,
  sendLocalNotification,
  scheduleNotification,
};
