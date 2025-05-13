import React from 'react';
import {
  View,
  Text,
  Platform,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';

import {COLORS, GLOBALSTYLE} from '../../globalStyle/Theme';

import GoogleButtonSvg from '../../assets/svgs/GoogleButtonSvg';
import AppleButtonSvg from '../../assets/svgs/AppleButtonSvg';

import Sizer from '../../helpers/Sizer';
import {handleAppleSign, handleGoogleSign} from '../../helpers/SocialAuth';

import {useLoginWithSocialMutation} from '../../services/socailApi';
import {showMessage} from '../../utils';
import { KEYS } from '../../constants';

const SocialButtons = () => {
  const navigation = useNavigation();

  const [loaders, setLoaders] = React.useState({
    google: false,
    apple: false,
  });
  const [loginWithSocial, {isLoading}] = useLoginWithSocialMutation();
  const handleSocailLogin = async type => {
    try {
      setLoaders(prev => ({...prev, [type]: true}));
      const token =
        type === 'apple' ? await handleAppleSign() : await handleGoogleSign();
      // console.log(' SocialButtons.js:21 ~ SocialButtons ~ token:', token);
      if (!token) return;

      const deviceToken = await AsyncStorage.getItem(KEYS.FCM_TOKEN);

      await loginWithSocial({
        socialToken: token,
        deviceToken: deviceToken || null,
        provider: type,
        navigation: navigation,
      });
      // console.log(' SocialButtons.js:29 ~ SocialButtons ~ response:', response);
    } catch (error) {
      showMessage({
        message: 'Something went wrong! Please try again',
      });
    } finally {
      setLoaders(prev => ({...prev, [type]: false}));
    }
  };
  return (
    <>
      <View style={GLOBALSTYLE.socialBtn}>
        <TouchableNativeFeedback
          onPress={() => handleSocailLogin('google')}
          disabled={loaders.google || loaders.apple || isLoading}>
          {loaders.google ? (
            <View style={styles.loaderView}>
              <ActivityIndicator size={18} />
            </View>
          ) : (
            <GoogleButtonSvg width={'100%'} height={Sizer.hSize(50)} />
          )}
        </TouchableNativeFeedback>
      </View>
      {Platform.OS == 'ios' && (
        <View style={GLOBALSTYLE.socialBtn}>
          <TouchableNativeFeedback
            onPress={() => handleSocailLogin('apple')}
            disabled={loaders.apple || loaders.google || isLoading}>
            {loaders.apple ? (
              <View style={styles.loaderView}>
                <ActivityIndicator size={18} />
              </View>
            ) : (
              <AppleButtonSvg width={'100%'} height={Sizer.hSize(50)} />
            )}
          </TouchableNativeFeedback>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loaderView: {
    borderWidth: 1,
    borderColor: COLORS.grey500,
    borderRadius: 10,
    paddingVertical: 18,
    marginHorizontal: 12,
  },
});
export default SocialButtons;
