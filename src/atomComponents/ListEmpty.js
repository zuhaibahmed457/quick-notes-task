import React from 'react';
import {View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import Typography from './Typography';

import Sizer from '../helpers/Sizer';
import {COLORS, WINDOW} from '../globalStyle/Theme';

const ListEmpty = ({
  type = '',
  isLoading = false,
  height = 200,
  color = COLORS.blueV1,
  showNo = true,
}) => {
  return (
    <View
      style={{
        width: WINDOW.width - 24,
        height: Sizer.hSize(height),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isLoading ? (
        <ActivityIndicator size={14} color={color} />
      ) : (
        <Typography size={12} fFamily="bold" textAlign="center" color={color}>
          {showNo ? 'No' : null} {type}
        </Typography>
      )}
    </View>
  );
};

export default React.memo(ListEmpty);
