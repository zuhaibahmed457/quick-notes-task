import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {COLORS} from '../../globalStyle/Theme.js';

import Flex from '../../atomComponents/Flex';

import ScaledView from '../../animations/ScaledView';

// API
import Typography from '../../atomComponents/Typography.js';
import {setUser} from '../../redux/slices/appSlice.js';
import {getUser, userLogout} from '../../services/UserServices.js';
import {showMessage} from '../../utils/index.js';
import format from 'pretty-format';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // CHECK FOR USER
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const unsubscribe = auth().onAuthStateChanged(async user => {
        if (user?._user) {
          const userSnapShot = await getUser();
          console.log('🚀 ~ unsubscribe ~ userSnapShot:', userSnapShot);
          if (!userSnapShot) {
            goToLogin();
            return;
          }
          dispatch(setUser({...userSnapShot, uid: user?._user?.uid}));
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'MainStack'}],
            }),
          );
        } else {
          // No user is logged in, go to Login screen
          goToLogin();
        }
      });

      // Optionally clean up the listener
      return () => unsubscribe();
    } catch (error) {
      console.log('🚀 ~ checkUser ~ error:', error);
      goToLogin();
    }
  };

  const goToLogin = async () => {
    // await userLogout(navigation);
    navigation.replace('LoginScreen');
  };

  return (
    <Flex
      jusContent={'center'}
      algItems={'center'}
      flexStyle={{
        ...styles.imgWrapper,
        backgroundColor: COLORS.primary,
      }}>
      <ScaledView duration={1500}>
        <Typography color={COLORS.white100} fFamily="bold" size={34}>
          MINI CHAT / NOTE
        </Typography>
      </ScaledView>
    </Flex>
  );
};

const styles = StyleSheet.create({
  imgWrapper: {
    flex: 1,
  },
});

export default SplashScreen;
