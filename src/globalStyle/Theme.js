import {Dimensions} from 'react-native';
import Sizer from '../helpers/Sizer';

const BASEOPACITY = 0.5;

const COLORS = {
  primary: '#0C4F9E',
  secondary: '#FF9035',

  white100: '#FFFFFF',

  blue200: '#f0fdff',
  blue500: '#22215B',

  grey100: '#9090AD',
  grey200: '#363C49',
  grey300: '#979797',
  grey400: '#e6eef6',
  grey500: '#DADADA',

  orange100: '#fff4e8',
  dark100: '#000000',

  purple600: '#7C69EE',

  red600: '#B90205',
  green600: '#02B984',
  yellow600: '#E9C80D',
};

const FONTS = {
  light: 'Manrope-Light',
  regular: 'Manrope-Regular',
  medium: 'Manrope-Medium',
  semiBold: 'Manrope-SemiBold',
  bold: 'Manrope-Bold',
  extraBold: 'Manrope-ExtraBold',
};

const WINDOW = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  fixPadding: 24,
};

const GLOBALSTYLE = {
  wrap: {
    flex: 1,
  },

  // MAIN PADDING
  verticalSpace: {
    paddingHorizontal: Sizer.wSize(18),
  },

  // INPUT CONTIANER
  inputContainer: {
    paddingBottom: Sizer.hSize(14),
  },

  // AUTH HEADING
  authHead: {
    fontSize: Sizer.fS(20),
    fontFamily: FONTS.semiBold,
    marginBottom: Sizer.hSize(10),
  },

  // AUTH WRAPPER STYLE
  authWrapperStyle: {
    borderTopLeftRadius: Sizer.wSize(36),
    borderTopRightRadius: Sizer.wSize(36),
    backgroundColor: COLORS.white100,
    overflow: 'hidden',
    // flex: 1,
  },

  // SOCIAL BUTTON
  socialBtn: {
    marginBottom: Sizer.hSize(10),
  },

  // DIVIDER
  dividerGrey: {
    // flex: 1,
    backgroundColor: COLORS.grey300,
  },
};

export {COLORS, WINDOW, FONTS, GLOBALSTYLE, BASEOPACITY};
