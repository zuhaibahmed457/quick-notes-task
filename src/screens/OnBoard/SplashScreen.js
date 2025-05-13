import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

import {COLORS} from '../../globalStyle/Theme.js';

import Flex from '../../atomComponents/Flex';

import ScaledView from '../../animations/ScaledView';

// API
import Typography from '../../atomComponents/Typography.js';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    // CHECK FOR USER
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const unsubscribe = auth().onAuthStateChanged(user => {
        if (user) {
          // User is logged in, go to Home/Main screen
          navigation.replace('MainStack'); // Replace with your main app screen
        } else {
          // No user is logged in, go to Login screen
          navigation.replace('LoginScreen');
        }
      });

      // Optionally clean up the listener
      return () => unsubscribe();
    } catch (error) {
      console.log('SplashScreen ~ checkUser error:', error);
      navigation.replace('LoginScreen');
    }
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
        <Typography color={COLORS.white100} fFamily="bold" size={42}>
          QUICK NOTES
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
