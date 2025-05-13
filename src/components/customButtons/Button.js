import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import Sizer from '../../helpers/Sizer';
import {BASEOPACITY, COLORS, FONTS} from '../../globalStyle/Theme';
import Flex from '../../atomComponents/Flex';

function Button({
  label = 'Custom Button',
  btnStyle = '',
  textStyle = '',
  loader = false,
  disabled = false,
  upperCase = false,
  onPress = () => {},
  icon = false,
  rightIcon = false,
  type = 'secondary',
  mB = 0,
  mT = 0,
  iconGap = 8,
  fontSize = 16,
  ...props
}) {
  let bgColor;
  let textColor = COLORS.white100;
  let loaderColor = COLORS.white100;
  let borderColor = COLORS.primary;
  let borderWidth = 1;

  if (type === 'primary') {
    bgColor = COLORS.primary;
    borderColor = COLORS.primary;
  } else if (type === 'secondary') {
    bgColor = COLORS.secondary;
    borderColor = COLORS.secondary;
  } else if (type === 'danger') {
    bgColor = COLORS.red600;
    borderColor = COLORS.red600;
  } else if (type === 'success') {
    bgColor = COLORS.greenV1;
    borderColor = COLORS.greenV1;
  } else if (type === 'dark') {
    bgColor = COLORS.darkV3;
    borderColor = COLORS.darkV3;
  } else if (type === 'outline') {
    borderWidth = 1;
    bgColor = 'transparent';
    textColor = COLORS.secondary;
    loaderColor = COLORS.secondary;
    borderColor = COLORS.secondary;
  } else if (type === 'blue') {
    bgColor = COLORS.blueV1;
    borderColor = COLORS.blueV1;
    textColor = COLORS.white100;
    loaderColor = COLORS.white100;
  } else {
    bgColor = COLORS.white100;
    borderColor = COLORS.white100;
    textColor = COLORS.darkV1;
    loaderColor = COLORS.white100;
  }

  const styles = {
    btn: {
      borderRadius: Sizer.fS(10),
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Sizer.hSize(10),
      paddingHorizontal: Sizer.hSize(12),
      borderColor: borderColor,
      borderWidth: borderWidth,
    },
    btnTextStyle: {
      fontFamily: FONTS.semiBold,
      fontSize: Sizer.fS(fontSize),
      textAlign: 'center',
      textTransform: upperCase ? 'uppercase' : 'capitalize',
    },
  };

  return (
    <TouchableOpacity
      disabled={loader || disabled}
      activeOpacity={BASEOPACITY}
      style={[
        styles.btn,
        {
          backgroundColor: bgColor,
          marginBottom: Sizer.hSize(mB),
          marginTop: Sizer.hSize(mT),
        },
        btnStyle,
      ]}
      onPress={onPress}
      {...props}>
      {loader ? (
        <ActivityIndicator size={Sizer.fS(22)} color={loaderColor} />
      ) : (
        <Flex gap={iconGap} algItems="center">
          {!!icon && icon}
          <Text style={[styles.btnTextStyle, {color: textColor}, textStyle]}>
            {label}
          </Text>
          {!!rightIcon && rightIcon}
        </Flex>
      )}
    </TouchableOpacity>
  );
}

export default React.memo(Button);
