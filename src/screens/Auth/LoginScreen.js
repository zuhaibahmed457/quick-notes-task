import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {Container, Flex, Typography} from '../../atomComponents';
import {
  AuthHeader,
  Button,
  CustomSwitch,
  FormController,
  TextField,
} from '../../components';

import {COLORS, GLOBALSTYLE} from '../../globalStyle/Theme';

import Sizer from '../../helpers/Sizer';
import SlideInView from '../../animations/SlideView';

// API SERVICE
import validatoinSchema from '../../validations';
import {setUser} from '../../redux/slices/appSlice';
import {getUser} from '../../services/UserServices';

const LoginScreen = ({navigation}) => {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  // API LOGIC
  const handleLogin = async values => {
    setIsLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        values.email,
        values.password,
      );

      const uid = userCredential.user.uid;

      // Fetch user details from Firestore
      const userSnapShot = await getUser();

      if (userSnapShot == null) {
        showMessage({
          type: 'danger',
          message: 'User Not Found',
        });

        return;
      }

      console.log('🚀 ~ LoginScreen ~ userSnapShot:', userSnapShot);
      // Dispatch to Redux
      dispatch(setUser({...userSnapShot, uid}));

      // Show success message
      showMessage({
        type: 'success',
        message: 'Login Successfully!',
      });
    } catch (error) {
      showMessage({
        type: 'danger',
        message: error?.message || 'Login Failed!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <Container conStyle={styles.mainBG}>
        <AuthHeader titleSize={42} />
        <SlideInView slide="down">
          <View
            style={{
              ...GLOBALSTYLE.verticalSpace,
              ...GLOBALSTYLE.authWrapperStyle,
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.scrollContent,
                {paddingBottom: Sizer.hSize(inset.bottom + 180)},
              ]}>
              <Text style={{...GLOBALSTYLE.authHead}}>Login</Text>
              <Typography color={COLORS.grey100} mB={20}>
                Log In now to continue your amazing journey
              </Typography>
              <FormController
                initialValues={{
                  email: 'test@gmail.com',
                  password: 'Admin@1234',
                }}
                validationSchema={validatoinSchema.AuthValidations.SignInSchema}
                onSubmit={handleLogin}>
                {props => {
                  const {
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    handleBlur,
                  } = props;

                  return (
                    <>
                      <View style={styles.formContainer}>
                        <View style={GLOBALSTYLE.inputContainer}>
                          <TextField
                            label="Email"
                            handleChange={handleChange('email')}
                            value={values?.email}
                            error={errors?.email}
                            onBlur={handleBlur('email')}
                          />
                        </View>
                        <View style={GLOBALSTYLE.inputContainer}>
                          <TextField
                            label="Password"
                            password
                            rightIcon
                            handleChange={handleChange('password')}
                            value={values?.password}
                            error={errors?.password}
                            onBlur={handleBlur('password')}
                          />
                        </View>
                        <Flex
                          jusContent={'space-between'}
                          algItems={'center'}
                          mT={10}>
                          <Flex algItems={'center'} gap={10}>
                            <CustomSwitch value={true} />
                            <Typography color={COLORS.blue500} size={13}>
                              Remember Me
                            </Typography>
                          </Flex>
                        </Flex>
                      </View>

                      <Button
                        label="Log In"
                        mT={20}
                        disabled={isLoading}
                        loader={isLoading}
                        onPress={handleSubmit}
                      />
                    </>
                  );
                }}
              </FormController>
              <Flex jusContent={'center'} algItems={'center'} mT={16} gap={3}>
                <Typography
                  color={COLORS.grey100}
                  size={12}
                  textAlign={'center'}>
                  Don’t have an account? {''}
                </Typography>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignUpScreen')}>
                  <Typography color={COLORS.primary} size={12} fFamily={'bold'}>
                    Sign Up
                  </Typography>
                </TouchableOpacity>
              </Flex>
            </ScrollView>
          </View>
        </SlideInView>
      </Container>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainBG: {
    backgroundColor: COLORS.primary,
    justifyContent: 'space-between',
  },
  formContainer: {
    paddingVertical: 12,
  },

  divider: {
    flex: 1,
    height: 1,
  },
  scrollContent: {
    paddingTop: 40,
  },
});

export default LoginScreen;
