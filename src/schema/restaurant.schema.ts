import { object, string, ref } from 'yup';

export const createRestaurantSchema = object({
  body: object({
    firstName: string().required('First Name is required'),
    lastName: string().required('Last Name is required'),
    phone: string().required('Phone is required'),
    password: string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
    passwordConfirmation: string().oneOf([ref('password'), null], 'Passwords must match'),
  }),
});

export const createRestaurantSessionSchema = object({
  body: object({
    email: string().email('Invalid email').required('Email is required'),
    password: string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
  }),
});
