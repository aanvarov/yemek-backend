import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createUser } from '../services/user.service';
import log from '../logger';
// controllers are responsible for handling the business logic
// controllers are never going to interact directly with our database
// that is why services are used to interact with the database
// this means we can separate database logic from our business logic
export async function createUserHandler(req: Request, res: Response) {
  try {
    log.info(req.body);
    const user = await createUser(req.body);
    log.info(`User ${user.phone} created`);
    return res.status(201).send(omit(user.toJSON(), ['password']));
  } catch (error) {
    log.error('Error creating user');
    log.error(error);
    return res.status(409).send({ error: error.message });
  }
}
