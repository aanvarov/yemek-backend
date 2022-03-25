import express from 'express';
import { createUserHandler } from '../controllers/user.controller';
import { createRestaurantHandler } from '../controllers/restaurant.controller';
import {
  createUserSessionHandler,
  createRestaurantSessionHandler,
  invalidateSessionHandler,
  getUserSessionsHandler,
} from '../controllers/session.controller';
import { createUserSchema, createUserSessionSchema } from '../schema/user.schema';
import { createRestaurantSchema, createRestaurantSessionSchema } from '../schema/restaurant.schema';
import { validateRequest, requiresUser } from '../middleware';
const router = express.Router();

/*
 * GET
 */
/**
 * @swagger
 * /api/v1/auth/login:
 *    post:
 *        summary: Customer login
 *        description: Users can login (Customers, Delivery)
 */

// sign up a new user
router.post('/signup', validateRequest(createUserSchema), createUserHandler);
// login with session token (customer)
router.post('/sessions', validateRequest(createUserSessionSchema), createUserSessionHandler);
// get user's session
router.get('/sessions', getUserSessionsHandler);
// log out a user
// delete requiresUser middleware to test the route in postman
router.delete('/sessions', invalidateSessionHandler);

// sign up a new restaurant
router.post(
  '/restaurants/signup',
  validateRequest(createRestaurantSchema),
  createRestaurantHandler,
);
// login with session for restaurants
router.post(
  '/restaurants/sessions',
  validateRequest(createRestaurantSessionSchema),
  createRestaurantSessionHandler,
);

// log out a restaurant
// delete requiresUser middleware to test the route in postman
router.delete('/restaurants/sessions', invalidateSessionHandler);

export default router;
