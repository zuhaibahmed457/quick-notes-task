import * as Yup from 'yup';
import {nameValidation} from './customValidations';

const addBeneficiarySchema = Yup.object().shape({
  name: nameValidation(2, 50),
  gender: Yup.string()
    .oneOf(['Male', 'Female', 'Other'], 'Invalid gender')
    .required('Gender is required'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone must be 10 digits')
    .required('Phone is required'),
  dob: Yup.date()
    .max(new Date(), 'DOB cannot be in the future')
    .required('Date of birth is required'),
  address: Yup.string().required('Address is required'),
  insurance_name: Yup.string().required('Insurance name is required'),
  insurance_id: Yup.string().required('Insurance ID is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  zip_code: Yup.string()
    .matches(/^\d{5}$/, 'ZIP code must be 5 digits')
    .required('ZIP code is required'),
});

export default {
  addBeneficiarySchema,
};
