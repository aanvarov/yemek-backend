import express from 'express';
import { requiresUser, validateRequest } from '../middleware';
const router = express.Router();
import {
  createCartHandler,
  updateCartHandler,
  getCartHandler,
  getCartsHandler,
  deleteCartHandler,
} from '../controllers/cart.controller';

import {
  createCartSchema,
  updateCartSchema,
  deleteCartSchema,
  getCartSchema,
} from '../schema/cart.schema';

// create a cart
router.post('/', [requiresUser, validateRequest(createCartSchema)], createCartHandler);

// get all cart (, requiresUser)
router.get('/', requiresUser, getCartsHandler);

// get a cart
router.get('/:cartId', [requiresUser, validateRequest(getCartSchema)], getCartHandler);

// update a cart
router.put('/:cartId', [requiresUser, validateRequest(updateCartSchema)], updateCartHandler);

// delete a cart
router.delete('/:cartId', [requiresUser, validateRequest(deleteCartSchema)], deleteCartHandler);

export default router;
