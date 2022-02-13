import express from 'express';
const router = express.Router();
import { createUserHandler } from '../controllers/user.controller';
import { createUserSchema } from '../schema/user.schema';
import validateRequest from '../middleware/validateRequest';

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

router.get('/login', createUserHandler);
router.post('/signup', validateRequest(createUserSchema), createUserHandler);

export default router;
