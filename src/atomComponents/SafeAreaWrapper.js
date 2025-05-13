import {View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {COLORS, GLOBALSTYLE} from '../globalStyle/Theme';

const SafeAreaWrapper = ({
  children,
  edges = null,
  contentStyle = {},
  bgColor = COLORS.white100,
}) => {
  console.log('✅ ~ edges:', edges);
  return (
    <SafeAreaView
      style={{...GLOBALSTYLE.wrap, backgroundColor: bgColor}}
      {...edges}>
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;
