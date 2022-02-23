import { object, string, ref } from 'yup';

const payload = {
  body: object({
    name: string().required('Name is required'),
    description: string().required('Description is required'),
    // restaurant: ref('Restaurant').required(),
  }),
};

const params = {
  params: object({
    categoryId: string().required('Category ID is required'),
  }),
};

export const createCategorySchema = object({
  ...payload,
});

export const updateCategorySchema = object({
  ...params,
  ...payload,
});

export const deleteCategorySchema = object({
  ...params,
});
