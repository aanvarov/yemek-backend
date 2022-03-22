import express from 'express';
import { requiresUser, validateRequest } from '../middleware';
const router = express.Router();
import {
  createCityHandler,
  updateCityHandler,
  getCityHandler,
  getCitiesHandler,
  deleteCityHandler,
} from '../controllers/city.controller';

import {
  createCitySchema,
  updateCitySchema,
  deleteCitySchema,
  getCitySchema,
} from '../schema/city.schema';

// create a cart
router.post('/', [requiresUser, validateRequest(createCitySchema)], createCityHandler);

// get all cart (, requiresUser)
router.get('/', requiresUser, getCitiesHandler);

// get a cart
router.get('/:cityId', [requiresUser, validateRequest(getCitySchema)], getCityHandler);

// update a cart
router.put('/:cityId', [requiresUser, validateRequest(updateCitySchema)], updateCityHandler);

// delete a cart
router.delete('/:cityId', [requiresUser, validateRequest(deleteCitySchema)], deleteCityHandler);

export default router;
