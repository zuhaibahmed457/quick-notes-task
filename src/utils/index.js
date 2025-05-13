import format from 'pretty-format';
import {Platform, StatusBar} from 'react-native';
import {showMessage as flashMessage} from 'react-native-flash-message';

export const showMessage = ({message = '', type = 'default', bgColor = ''}) => {
  const backgroundColor =
    bgColor ||
    (type === 'success'
      ? '#38E54D'
      : type === 'danger'
      ? '#CD1818'
      : '#999999');

  flashMessage({
    message: message,
    type: type,
    backgroundColor: backgroundColor,
  });
};

export const setStatusBar = ({
  color = 'transparent',
  content = 'dark-content',
  hidden = false,
}) => {
  StatusBar.setBarStyle(content);
  StatusBar.setHidden(hidden);
  if (Platform.OS == 'ios') return;
  StatusBar.setBackgroundColor(color);
};

export const maskPhoneNumber = input => {
  if (!input) return;
  // Remove all non-numeric characters from the input and take only 10 first digits
  const digits = input.replace(/\D/g, '').slice(0, 10);

  // Return empty string if there are no digits
  if (digits.length === 0) return '';

  let formattedPhoneNumber = '';

  // Apply different formats based on digit length
  if (digits.length <= 3) {
    // Format for 1-3 digits
    formattedPhoneNumber = digits;
  } else if (digits.length <= 6) {
    // Format for 4-6 digits as AAA-BBB
    formattedPhoneNumber = digits.replace(/(\d{3})(\d+)/, '$1-$2');
  } else {
    // Format for 7-10 digits as AAA-BBB-CCCC
    formattedPhoneNumber = digits.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
  }

  return formattedPhoneNumber;
};

export const maskDOB = input => {
  if (!input) return;
  // Remove all non-numeric characters and limit to 8 digits (YYYYMMDD)
  const digits = input.replace(/\D/g, '').slice(0, 8);

  if (digits.length === 0) return '';

  let formattedDOB = '';

  if (digits.length <= 4) {
    // Format for 1–4 digits (year)
    formattedDOB = digits;
  } else if (digits.length <= 6) {
    // Format for 5–6 digits (YYYY-MM)
    formattedDOB = digits.replace(/(\d{4})(\d+)/, '$1-$2');
  } else {
    // Format for 7–8 digits (YYYY-MM-DD)
    formattedDOB = digits.replace(/(\d{4})(\d{2})(\d+)/, '$1-$2-$3');
  }

  return formattedDOB;
};
