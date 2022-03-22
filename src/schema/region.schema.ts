import { object, string, ref } from 'yup';

const payload = {
  body: object({
    name: string().required('Region Name is required'),
  }),
};

const params = {
  params: object({
    regionId: string().required('Region ID is required'),
  }),
};

export const createRegionSchema = object({
  ...payload,
});

export const updateRegionSchema = object({
  ...params,
  ...payload,
});

export const deleteRegionSchema = object({
  ...params,
});

export const getRegionSchema = object({
  ...params,
});
