import { object, string, ref } from 'yup';

export const createRestaurantSchema = object({
  body: object({
    name: string().required('Name is required').min(3, 'Name must be at least 3 characters long'),
    email: string().required('Email is required').email('Email is invalid'),
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
