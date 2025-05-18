import {Platform} from 'react-native';
import {openSettings, requestNotifications} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import format from 'pretty-format';

import notifee from '@notifee/react-native';
import {KEYS} from '../constants';

export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    const {status} = await requestNotifications([
      'alert',
      'sound',
      'badge',
      'carPlay',
    ]);
    if (status === 'granted') {
      await registerForNotifications();
    } else if (status === 'denied' || status === 'blocked') {
      openSettings();
    }
  }

  const authStatus = await messaging().requestPermission();
  if (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  ) {
    await registerForNotifications();
  }
};

export const notificationListener = dispatch => {
  receiveBackgroundMessages();
  receiveInitialNotificationMessages();
  receiveForegroundMessages(dispatch);
};

const registerForNotifications = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    if (token) {
      AsyncStorage.setItem(KEYS.FCM_TOKEN, token);
    }
  } catch (err) {
    console.log(
      ' notificationHelper.js:49 ~ registerForNotifications ~ err:',
      err,
    );
  }
};

const receiveForegroundMessages = () => {
  messaging().onMessage(async remoteMessage => {
    handleForegroundNotification(remoteMessage);
  });
};

const receiveInitialNotificationMessages = () => {
  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      console.log(
        '🚀 ~ receiveInitialNotificationMessages ~ notification state quit:',
        remoteMessage,
      );
    });
};

const receiveBackgroundMessages = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log('notification state background: ', remoteMessage); // background click
  });
};

const handleForegroundNotification = async remoteMsg => {
  console.log(
    '🚀 ~ handleForegroundNotification ~ remoteMsg:',
    format(remoteMsg),
  );
  try {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    await notifee.requestPermission();
    await notifee.displayNotification({
      ...remoteMsg?.notification,
      android: {
        ...remoteMsg?.notification?.android,
        channelId,
      },
    });
    console.log('NOTI ');
  } catch (err) {
    console.log(
      ' notificationHelper.js:66 ~ handleForegroundNotification ~ err:',
      err,
    );
  }
};
