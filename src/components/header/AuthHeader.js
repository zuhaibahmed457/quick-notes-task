import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {COLORS} from '../../globalStyle/Theme';

import Sizer from '../../helpers/Sizer';
import {Flex, Typography} from '../../atomComponents';
import Icon from '../../helpers/Icon';

const AuthHeader = ({back = false, titleSize = 25}) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={[styles.layoutWrapper, {paddingTop: Sizer.hSize(inset.top + 24)}]}>
      <Flex algItems={'center'}>
        {back && (
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Icon
              name={'arrow-back-circle-outline'}
              iconFamily={'Ionicons'}
              color={COLORS.white100}
              size={40}
            />
          </TouchableOpacity>
        )}
        <View
          style={[
            styles.logoWrapper,
            {alignItems: back ? 'flex-start' : 'center'},
          ]}>
          <Typography
            color={COLORS.white100}
            fFamily="bold"
            size={titleSize}
            textAlign="center">
            Mini chat/note
          </Typography>
        </View>
      </Flex>
    </View>
  );
};

const styles = StyleSheet.create({
  layoutWrapper: {
    backgroundColor: COLORS.primary,

    paddingVertical: Sizer.hSize(24),
    paddingHorizontal: Sizer.hSize(18),
  },
  backBtn: {
    flex: 0.5,
  },
  logoWrapper: {
    flex: 1,
  },
});

export default AuthHeader;
