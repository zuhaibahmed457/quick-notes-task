import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  SplashScreen,
  LoginScreen,
  SignUpScreen,
  HomeScreen,
  AddNoteScreen,
  EditNoteScreen,
  ChatScreen,
} from '../screens';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const screenOptions = {
    headerShown: false,
    headerTransparent: true,
    animationTypeForReplace: 'push',
    animation: 'slide_from_right',
    tabBarHideOnKeyboard: true,
  };
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      {/* ON BOARD STACK */}
      <Stack.Group screenOptions={screenOptions}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </Stack.Group>

      {/* AUTH STACK */}
      <Stack.Group screenOptions={screenOptions}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      </Stack.Group>

      {/* MAIN STACK */}
      <Stack.Group screenOptions={screenOptions}>
        <Stack.Screen name="MainStack" component={HomeScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="AddNoteScreen" component={AddNoteScreen} />
        <Stack.Screen name="EditNoteScreen" component={EditNoteScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
