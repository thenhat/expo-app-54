import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

export const registerForPushNotificationsAsync = async () => {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    try {
      token = (await Notifications.getDevicePushTokenAsync()).data;
    } catch (error) {
      console.error('Lỗi khi lấy device push token:', error);
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        const expoToken = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
        console.log('Fallback to Expo token:', expoToken);
        return expoToken;
      } catch (expoError) {
        console.error('Lỗi khi lấy expo token:', expoError);
      }
    }
  } else {
    console.log('푸시 알림을 받으려면 실제 장치가 필요합니다.');
  }

  return token;
};

export function setupNotificationListeners(onNotification: any) {
  const notificationListener = Notifications.addNotificationReceivedListener(notification => {
    if (onNotification) {
      onNotification(notification);
    }
  });

  const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    console.log('Notifications:', response);
  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
}

export const checkInitialNotification = async (callback: any) => {
  const response = await Notifications.getLastNotificationResponseAsync();

  if (response) {
    console.log('App opened from notification:', response);
    const data = response.notification.request.content.data;
    callback(response.notification, data);
  }
};