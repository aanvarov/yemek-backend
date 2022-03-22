import express from 'express';
import { requiresUser, validateRequest } from '../middleware';
const router = express.Router();
import {
  createRegionHandler,
  updateRegionHandler,
  getRegionHandler,
  getRegionsHandler,
  deleteRegionHandler,
} from '../controllers/region.controller';

import {
  createRegionSchema,
  updateRegionSchema,
  deleteRegionSchema,
  getRegionSchema,
} from '../schema/region.schema';

// create a cart
router.post('/', [requiresUser, validateRequest(createRegionSchema)], createRegionHandler);

// get all cart (, requiresUser)
router.get('/', requiresUser, getRegionsHandler);

// get a cart
router.get('/:regionId', [requiresUser, validateRequest(getRegionSchema)], getRegionHandler);

// update a cart
router.put('/:regionId', [requiresUser, validateRequest(updateRegionSchema)], updateRegionHandler);

// delete a cart
router.delete(
  '/:regionId',
  [requiresUser, validateRequest(deleteRegionSchema)],
  deleteRegionHandler,
);

export default router;
