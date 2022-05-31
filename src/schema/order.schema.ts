import { object, string, ref } from "yup";

const payload = {
  body: object({
    name: string().required("Name is required"),
    description: string().required("Description is required"),
    restaurant: ref("Restaurant"),
  }),
};

const params = {
  params: object({
    categoryId: string().required("Category ID is required"),
  }),
};

export const createOrderSchema = object({
  ...payload,
});

export const updateOrderSchema = object({
  ...params,
  ...payload,
});

export const deleteOrderSchema = object({
  ...params,
});

export const getOrderSchema = object({
  ...params,
});
