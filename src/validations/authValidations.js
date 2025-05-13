import * as Yup from 'yup';
import {
  imageValidation,
  nameValidation,
  passwordRegex,
} from './customValidations';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Password must contain at least one alphabetic character, one numeric character, and one special character.',
    ),
});

const SignUpSchema = Yup.object().shape({

  first_name: nameValidation(2, 30),
  last_name: nameValidation(2, 30),

  email: Yup.string().email('Invalid email').required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Password must contain at least one alphabetic character, one numeric character, and one special character.',
    ),

  password_confirmation: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

export default {
  SignUpSchema,
  SignInSchema,
};
