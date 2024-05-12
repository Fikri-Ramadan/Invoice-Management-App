import * as Yup from 'yup';

export const validateLogin = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

export const validateRegister = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required'),
});