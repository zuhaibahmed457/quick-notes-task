import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {Container, Flex, Typography} from '../../atomComponents';
import {AuthHeader, Button, FormController, TextField} from '../../components';

import {COLORS, GLOBALSTYLE} from '../../globalStyle/Theme';

import Sizer from '../../helpers/Sizer';
import SlideInView from '../../animations/SlideView';

import {showMessage} from '../../utils';

// API SERVICES
import validatoinSchema from '../../validations';

// SCHEMA
const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
};

const SignUpScreen = ({navigation}) => {
  const inset = useSafeAreaInsets();

  // API LOGIC

  const handleRegister = async values => {
    const {email, password, first_name, last_name} = values;
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const uid = userCredential.user.uid;

      // Store extra user data in Firestore
      await firestore().collection('users').doc(uid).set({
        firstName: first_name,
        lastName: last_name,
        email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      showMessage({
        type: 'success',
        message: 'Account Created Successfully!',
      });
    } catch (error) {
      showMessage({
        type: 'danger',
        message: error?.message || 'Something went wrong!',
      });
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <Container conStyle={styles.mainBG}>
        <AuthHeader back />
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
              <Text style={{...GLOBALSTYLE.authHead}}>Sign Up</Text>
              <Typography color={COLORS.grey100} mB={30}>
                Sign Up now to begin an amazing journey
              </Typography>
              {/* REGISTERATION FORM */}
              <FormController
                initialValues={initialValues}
                validationSchema={validatoinSchema.AuthValidations.SignUpSchema}
                onSubmit={handleRegister}>
                {props => {
                  const {
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    handleBlur,
                    setFieldValue,
                  } = props;
                  console.log(
                    ' SignUpScreen.js:193 ~ SignUpScreen ~ errors:',
                    errors,
                  );
                  return (
                    <>
                      <View style={styles.formContainer}>
                        <View style={GLOBALSTYLE.inputContainer}>
                          <TextField
                            label="First Name"
                            handleChange={handleChange('first_name')}
                            value={values?.first_name}
                            error={errors?.first_name}
                            onBlur={handleBlur('first_name')}
                          />
                        </View>
                        <View style={GLOBALSTYLE.inputContainer}>
                          <TextField
                            label="Last Name"
                            handleChange={handleChange('last_name')}
                            value={values?.last_name}
                            error={errors?.last_name}
                            onBlur={handleBlur('last_name')}
                          />
                        </View>

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
                        <View style={GLOBALSTYLE.inputContainer}>
                          <TextField
                            label="Confirm Password"
                            password
                            rightIcon
                            handleChange={handleChange('password_confirmation')}
                            value={values?.password_confirmation}
                            error={errors?.password_confirmation}
                            onBlur={handleBlur('password_confirmation')}
                          />
                        </View>
                      </View>

                      <Button
                        label="Sign Up"
                        mt={20}
                        onPress={handleSubmit}
                        // disabled={isLoading}
                        // loader={isLoading}
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
                  Already have an account?
                </Typography>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Typography color={COLORS.primary} size={12} fFamily={'bold'}>
                    Log In
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

const OrDivider = () => {
  return (
    <Flex algItems={'center'} gap={16} mT={30} mB={30}>
      <Divider style={[{...GLOBALSTYLE.dividerGrey}, styles.divider]} />
      <Typography size={14} color={COLORS.grey100} pR={12} pL={12}>
        or
      </Typography>
      <Divider style={[{...GLOBALSTYLE.dividerGrey}, styles.divider]} />
    </Flex>
  );
};

const styles = StyleSheet.create({
  mainBG: {
    backgroundColor: COLORS.primary,
  },
  formContainer: {
    paddingVertical: 12,
  },

  divider: {
    flex: 1,
    height: 1,
  },
  scrollContent: {
    paddingBottom: 180,
    paddingTop: 40,
  },
});

export default SignUpScreen;
