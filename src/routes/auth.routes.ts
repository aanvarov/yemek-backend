import express from 'express';
const router = express.Router();
import { createUserHandler } from '../controllers/user.controller';
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from '../controllers/session.controller';
import { createUserSchema, createUserSessionSchema } from '../schema/user.schema';
import { validateRequest, requiresUser } from '../middleware';

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
// login with session
router.post('/sessions', validateRequest(createUserSessionSchema), createUserSessionHandler);
// get user's session
router.get('/sessions', getUserSessionsHandler);
// log out a user
// delete requiresUser middleware to test the route in postman
router.delete('/sessions', invalidateUserSessionHandler);
export default router;
