import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import log from '../logger';

const requiresUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = get(req, 'user');
  if (!user) {
    log.error('User is not logged in(requiresUser middleware)');
    res.sendStatus(403);
  }
  return next();
};

export default requiresUser;
