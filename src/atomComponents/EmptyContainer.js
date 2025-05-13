import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../globalStyle/Theme';
import {ActivityIndicator} from 'react-native-paper';
import Typography from './Typography';

const EmptyContainer = ({error = ''}) => {
  return (
    <View style={styles.container}>
      {error ? (
        <Typography
          size={11}
          color={COLORS.primary}
          textAlign="center"
          fFamily="bold">
          {error}
        </Typography>
      ) : (
        <ActivityIndicator size={18} color={COLORS.blueV1} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.greyV3,
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(EmptyContainer);
