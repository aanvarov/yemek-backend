import { object, string, ref } from 'yup';

const payload = {
  body: object({
    name: string().required('Name is required'),
    price: string().required('Price is required'),
    img: string().required('Image is required'),
    description: string().required('Description is required'),
    category: ref('Category'),
  }),
};

const params = {
  params: object({
    categoryId: string().required('Category ID is required'),
  }),
};

export const createFoodSchema = object({
  ...payload,
});

export const updateFoodSchema = object({
  ...params,
  ...payload,
});

export const deleteFoodSchema = object({
  ...params,
});

export const getFoodSchema = object({
  ...params,
});
