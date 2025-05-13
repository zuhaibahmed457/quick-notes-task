import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';

const FormController = props => {
  const {
    initialValues,
    validationSchema,
    validateOnChange,
    validateOnBlur,
    onSubmit,
    children,
  } = props;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={validateOnChange}
      validateOnBlur={validateOnBlur}
      onSubmit={onSubmit}>
      {props => {
        const enhancedProps = {
          ...props,
          errors: Object.keys(props?.errors).reduce((acc, field) => {
            if (props.touched[field] || props.submitCount > 0) {
              acc[field] = props.errors[field];
            }
            return acc;
          }, {}),
        };

        return <>{children(enhancedProps)}</>;
      }}
    </Formik>
  );
};

export default FormController;
