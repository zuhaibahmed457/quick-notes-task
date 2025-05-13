import React, {memo, useState, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {COLORS, FONTS} from '../../globalStyle/Theme';
import Sizer from '../../helpers/Sizer';
import {Typography} from '../../atomComponents';
import format from 'pretty-format';
import {ActivityIndicator} from 'react-native-paper';

const data = [
  {label: 'FACEBOOK', value: '1'},
  {label: 'INSTAGRAM', value: '2'},
  {label: 'GOOGLE', value: '3'},
  {label: 'FRIEND', value: '4'},
  {label: 'OTHER', value: '5'},
];

function CustomDropdown({
  onChange = () => {},
  label = 'label',
  error = '',
  containerSt = {},
  mT = 0,
  mB = 0,
  selectedVal = null,
  editable = true,
  labelField = 'label',
  valueField = 'value',
  ...props
}) {
  const [value, setValue] = useState(selectedVal || null);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);

  const bgColor = isFocused ? COLORS.primary : COLORS.grey100;

  return (
    <>
      <View style={{marginTop: mT, marginBottom: mB}}>
        <View
          style={{
            ...styles.container,
            borderColor: bgColor,
            ...containerSt,
          }}>
          {label && (
            <View style={styles.label}>
              <Typography size={12} color={bgColor}>
                {label}
              </Typography>
            </View>
          )}
          <Dropdown
            dropdownPosition={props?.dropdownPosition || undefined}
            ref={dropdownRef}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            containerStyle={styles.listContainer}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.itemText}
            iconStyle={styles.iconStyle}
            data={props?.data || data}
            labelField={labelField}
            valueField={valueField}
            placeholder={!value ? props?.placeholder : ''}
            value={props?.value || value}
            renderItem={item =>
              props?.loading ? (
                <ActivityIndicator color={COLORS.primary} />
              ) : (
                <TouchableOpacity
                  style={styles.itemStyle}
                  onPress={() => {
                    onChange(item);
                    setIsFocused(false);
                    setValue(item.value);
                    dropdownRef.current?.close();
                  }}>
                  {

                  <Typography
                    size={14}
                    color={
                      (props?.value || value) == item.value
                        ? COLORS.primary
                        : COLORS.dark100
                    }>
                    {item?.label}
                  </Typography>
                  }
                </TouchableOpacity>
              )
            }
            onFocus={() => {
              setIsFocused(true);
              props.onFocus?.();
            }}
            onBlur={() => {
              setIsFocused(false);
              props.onBlur?.();
            }}
            onChange={() => {}}
            renderRightIcon={() => (
              <MaterialCommunityIcons
                name={isFocused ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={bgColor}
              />
            )}
          />
        </View>
        <View style={styles.errorHelperText}>
          {error && (
            <Typography size={9} color={COLORS.red600} mT={2} fFamily="bold">
              {error}
            </Typography>
          )}
        </View>
      </View>
    </>
  );
}

export default memo(CustomDropdown);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: COLORS.white100,
    height: Sizer.hSize(50),
    borderRadius: Sizer.fS(6),
    paddingHorizontal: Sizer.wSize(12),
    justifyContent: 'center',
  },
  dropdown: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
  },
  placeholderStyle: {
    color: COLORS.greyV1,
    fontFamily: FONTS.regular,
    fontSize: Sizer.fS(14),
  },
  selectedTextStyle: {
    color: COLORS.dark100,
    fontFamily: FONTS.regular,
    fontSize: Sizer.fS(14),
  },
  listContainer: {
    backgroundColor: COLORS.white100,
    borderWidth: 1,
    borderColor: COLORS.grey100,
    borderRadius: 6,
    marginTop: Sizer.hSize(5),
  },
  itemStyle: {
    paddingVertical: Sizer.hSize(10),
    paddingHorizontal: Sizer.wSize(12),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey100,
  },
  itemText: {
    fontSize: Sizer.fS(14),
    color: COLORS.dark100,
    fontFamily: FONTS.regular,
  },
  iconStyle: {
    width: 20,
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
  errorHelperText: {
    alignItems: 'flex-end',
  },
});
