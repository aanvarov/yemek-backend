import express from 'express';
const router = express.Router();
import { requiresUser, validateRequest } from '../middleware';
import { createFoodHandler } from '../controllers/food.controller';
import { createFoodSchema, getFoodSchema } from '../schema/food.schema';

// create a food
router.post('/', [requiresUser, validateRequest(createFoodSchema)], createFoodHandler);

// get all foods
// router.get('/', requiresUser, getFoodsHandler);

// get a food
// router.get('/:foodId', validateRequest(getFoodSchema), getFoodHandler);

export default router;
