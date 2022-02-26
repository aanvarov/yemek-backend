import { object, string, ref } from 'yup';

export const createUserSchema = object({
  body: object({
    firstName: string().required('Name is required'),
    lastName: string().required('Name is required'),
    // phone: string().email('Must be a valid email').required('Email is required'),
    phone: string().required('Phone is required'),
    password: string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
    passwordConfirmation: string().oneOf([ref('password'), null], 'Passwords must match'),
  }),
});

export const createUserSessionSchema = object({
  body: object({
    email: string().email('Must be a valid email').required('Email is required'),
    password: string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
  }),
});
