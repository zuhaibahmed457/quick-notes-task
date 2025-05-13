import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import FlashMessage from 'react-native-flash-message';

import StackNavigator from './StackNavigator';
import {COLORS} from '../globalStyle/Theme';

const RootNavigator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {})();
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
