import { object, string, ref } from 'yup';

const payload = {
  body: object({
    total: string().required('Total is required'),
    customer: ref('User'),
    restaurant: ref('Restaurant'),
  }),
};

const params = {
  params: object({
    cartId: string().required('Cart ID is required'),
  }),
};

export const createCartSchema = object({
  ...payload,
});

export const updateCartSchema = object({
  ...params,
  ...payload,
});

export const deleteCartSchema = object({
  ...params,
});

export const getCartSchema = object({
  ...params,
});
