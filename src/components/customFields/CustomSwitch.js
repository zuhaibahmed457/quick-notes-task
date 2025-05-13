import React from 'react';
import {Pressable, SafeAreaView, View, StyleSheet, Button} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Sizer from '../../helpers/Sizer';
import {COLORS} from '../../globalStyle/Theme';

const CustomSwitch = ({
  style = {},
  duration = 400,
  trackColors = {on: COLORS.primary, off: COLORS.grey300},
  value = false,
}) => {
  const isOn = useSharedValue(value);
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  const handlePress = () => {
    isOn.value = !isOn.value;
  };

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      isOn.value,
      [0, 1],
      [trackColors.off, trackColors.on],
    );
    const colorValue = withTiming(color, {duration});

    return {
      backgroundColor: colorValue,
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(
      Number(isOn.value),
      [0, 1],
      [0, width.value - height.value],
    );
    const translateValue = withTiming(moveValue, {duration});

    return {
      transform: [{translateX: translateValue}],
      borderRadius: height.value / 2,
    };
  });

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        onLayout={e => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        style={[switchStyles.track, style, trackAnimatedStyle]}>
        <Animated.View
          style={[switchStyles.thumb, thumbAnimatedStyle]}></Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const switchStyles = StyleSheet.create({
  track: {
    alignItems: 'flex-start',
    width: Sizer.wSize(30),
    height: Sizer.hSize(14),
    padding: 2,
  },
  thumb: {
    height: '100%',
    aspectRatio: 1,
    backgroundColor: 'white',
  },
});

export default CustomSwitch;
