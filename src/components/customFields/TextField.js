import * as React from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Sizer from '../../helpers/Sizer';
import {COLORS, FONTS} from '../../globalStyle/Theme';
import Typography from '../../atomComponents/Typography';

const TextField = React.forwardRef(
  (
    {
      containerSt = {},
      inputStyle = {},
      placeholder = '',
      label = 'label',
      error = '',
      placeholderColor = COLORS.greyV1,
      handleChange = e => {},
      rightIcon = '',
      leftIcon = '',
      focusFunctionality = false,
      next,
      borderWidth,
      password = false,
      leftIconContainer = {},
      customIcon = '',
      rightIconTopVal = 0,
      leftIconTopVal = 0,
      mT = 0,
      mB = 0,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = React.useState();
    const [isFocused, setIsFocused] = React.useState(false);
    const [hidePass, setHidePass] = React.useState(true);

    const bgColor = isFocused ? COLORS.primary : COLORS.grey100;

    return (
      <>
        <View
          style={{
            marginTop: mT,
            marginBottom: mB,
            borderColor: bgColor,
            ...styles.container,
            ...containerSt,
          }}>
          {label && (
            <View style={[styles.label]}>
              <Typography size={12} color={bgColor}>
                {label}
              </Typography>
            </View>
          )}
          {!!leftIcon && <View style={styles.leftIconCont}>{leftIcon}</View>}
          <TextInput
            ref={ref}
            value={value}
            secureTextEntry={password && hidePass}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            onChangeText={e => {
              setValue(e);
              handleChange(e);
            }}
            style={{
              ...styles.textInput,
              ...inputStyle,
            }}
            {...props}
          />
          {!!rightIcon && (
            <View style={styles.rightIconCont}>
              {password && (
                <MaterialCommunityIcons
                  size={Sizer.fS(18)}
                  color={bgColor}
                  name={hidePass ? 'eye-off-outline' : 'eye-outline'}
                  onPress={() => setHidePass(!hidePass)}
                />
              )}
              {customIcon}
            </View>
          )}
        </View>
        <View style={styles.errorHelperText}>
          {error && (
            <Typography size={9} color={COLORS.red600} mT={2} fFamily="bold">
              {error}
            </Typography>
          )}
        </View>
      </>
    );
  },
);

export default React.memo(TextField);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: COLORS.white100,

    flexDirection: 'row',
    alignItems: 'center',

    height: Sizer.hSize(50),
    borderRadius: Sizer.fS(6),
    paddingHorizontal: Sizer.wSize(12),
  },
  leftIconCont: {
    paddingRight: Sizer.wSize(6),
  },
  rightIconCont: {
    paddingLeft: Sizer.wSize(6),
  },
  label: {
    position: 'absolute',
    top: Sizer.wSize(-8),
    left: Sizer.wSize(6),
    backgroundColor: COLORS.white100,
    paddingHorizontal: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    color: COLORS.dark100,
    fontSize: Sizer.fS(14),
    paddingHorizontal: Sizer.wSize(0),
  },
  errorHelperText: {
    alignItems: 'flex-end',
  },
});
