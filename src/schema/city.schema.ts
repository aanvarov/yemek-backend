import { object, string, ref } from 'yup';

const payload = {
  body: object({
    name: string().required('City Name is required'),
    region: ref('Region'),
  }),
};

const params = {
  params: object({
    cityId: string().required('City ID is required'),
  }),
};

export const createCitySchema = object({
  ...payload,
});

export const updateCitySchema = object({
  ...params,
  ...payload,
});

export const deleteCitySchema = object({
  ...params,
});

export const getCitySchema = object({
  ...params,
});
