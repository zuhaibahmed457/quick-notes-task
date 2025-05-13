import React, {useState} from 'react';
import {View, StyleSheet, Pressable, Platform} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DatePickerModal} from 'react-native-paper-dates';
import {format} from 'date-fns';

import Sizer from '../../helpers/Sizer';
import {COLORS} from '../../globalStyle/Theme';
import Typography from '../../atomComponents/Typography';

const CustomDatePicker = ({
  label = 'Date',
  placeholder = 'Select Date',
  containerSt = {},
  error = '',
  mT = 0,
  mB = 0,
  mode = 'single',
  locale = 'en',
  dateFormat = 'yyyy-MM-dd',
  value = null,
  onChange = () => {},
  ...props
}) => {
  console.log(' CustomDatePicker.js:25 ~ value:', value);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View
        style={{
          marginTop: mT,
          marginBottom: mB,
          ...styles.container,
          borderColor: visible ? COLORS.primary : COLORS.grey100,
          ...containerSt,
        }}>
        {label && (
          <View style={[styles.label]}>
            <Typography
              size={12}
              color={visible ? COLORS.primary : COLORS.grey100}>
              {label}
            </Typography>
          </View>
        )}
        <Pressable style={styles.dateDisplay} onPress={() => setVisible(true)}>
          <Typography size={14} color={value ? COLORS.dark100 : COLORS.grey100}>
            {value ? format(value, dateFormat) : placeholder}
          </Typography>
          <MaterialCommunityIcons
            name="calendar-month-outline"
            color={COLORS.grey100}
            size={Sizer.fS(18)}
          />
        </Pressable>
      </View>

      <DatePickerModal
        locale={locale}
        mode={mode}
        animationType="slide"
        visible={visible}
        onDismiss={() => setVisible(false)}
        date={value || new Date()}
        onConfirm={({date}) => {
          onChange(date);
          setVisible(false);
        }}
        {...props}
      />

      <View style={styles.errorHelperText}>
        {error && (
          <Typography size={9} color={COLORS.red600} mT={2} fFamily="bold">
            {error}
          </Typography>
        )}
      </View>
    </>
  );
};

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
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
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
export default React.memo(CustomDatePicker);
