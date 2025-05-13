import React from 'react';

import {DefaultTheme, PaperProvider} from 'react-native-paper';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as ReduxProvider} from 'react-redux';

import RootNavigator from './src/navigation/RootNavigator';

import {COLORS} from './src/globalStyle/Theme';
import store from './src/redux/store/store';

export default function App() {
  const Theme = {
    ...DefaultTheme,
    myOwnProperty: true, // Fo Custom Keys
    colors: {
      ...DefaultTheme.colors,
      ...COLORS,
    },
  };

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={Theme}>
        <SafeAreaProvider>
          <GestureHandlerRootView>
            <RootNavigator />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}

// run npx react-native-assets.
