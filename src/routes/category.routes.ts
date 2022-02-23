import express from 'express';
import { requiresUser, validateRequest } from '../middleware';
const router = express.Router();
import {
  createCategoryHandler,
  updateCategoryHandler,
  getCategoryHandler,
  deleteCategoryHandler,
} from '../controllers/category.controller';

import {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
} from '../schema/category.schema';

// create a category
router.post('/', [requiresUser, validateRequest(createCategorySchema)], createCategoryHandler);

// update a category
router.put(
  '/:categoryId',
  [requiresUser, validateRequest(updateCategorySchema)],
  updateCategoryHandler,
);

// get a category
router.get('/:categoryId', getCategoryHandler);

// delete a category
router.delete(
  '/:categoryId',
  [requiresUser, validateRequest(deleteCategorySchema)],
  deleteCategoryHandler,
);

export default router;
