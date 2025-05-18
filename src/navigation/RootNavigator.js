import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FlashMessage from 'react-native-flash-message';

import StackNavigator from './StackNavigator';
import {COLORS} from '../globalStyle/Theme';
import {KEYS} from '../constants';
import {
  notificationListener,
  requestNotificationPermission,
} from '../helpers/notificationHelper';

const RootNavigator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      let fcmToken = await AsyncStorage.getItem(KEYS.FCM_TOKEN);
      console.log(' RootNavigator.js:20 ~ fcmToken:', fcmToken);

      if (!fcmToken) {
        requestNotificationPermission();
      }
      notificationListener(dispatch);
    })();
  }, []);
  return (
    <NavigationContainer>
      <FlashMessage
        position="top"
        autoHide={true}
        style={{paddingTop: StatusBar.currentHeight + 15}}
      />
      <StatusBar
        animated={true}
        backgroundColor={COLORS.primary}
        barStyle={'light-content'}
        showHideTransition={'fade'}
        translucent={true}
      />
      <StackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
