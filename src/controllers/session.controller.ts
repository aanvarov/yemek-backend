import { Request, Response } from 'express';
import { validateUserPassword } from '../services/user.service';
import { validateRestaurantPassword } from '../services/restaurant.service';
import {
  createSession,
  createUserAccessToken,
  createRestaurantAccessToken,
  updateSession,
  findSessions,
} from '../services/session.service';
import { sign } from '../utils/jwt.utils';
import config from 'config';
import log from '../logger';
import { get } from 'lodash';

// session handler for users
export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the email and password
  const user = await validateUserPassword(req.body);
  const userIpAddress = await get(req, 'socket.remoteAddress');
  if (!user) {
    return res.status(401).send('Invalid email or password');
  }
  // create session
  const session = await createSession(user._id, req.get('user-agent' || ''), userIpAddress);
  // create access token
  const accessToken = await createUserAccessToken({
    user,
    session,
  });
  // create refresh token
  const refreshToken = sign(session, {
    expiresIn: config.get('refreshTokenTtl'), // 1 year
  });
  // send access token and refresh token
  res.send({
    user,
    accessToken,
    refreshToken,
  });
}

// session handler for restaurants
export async function createRestaurantSessionHandler(req: Request, res: Response) {
  // validate the phone and password
  const restaurant = await validateRestaurantPassword(req.body);
  const restaurantIpAddress = await get(req, 'socket.remoteAddress');
  if (!restaurant) {
    return res.status(401).send('Invalid phone or password');
  }
  // create session
  const session = await createSession(
    restaurant._id,
    req.get('user-agent' || ''),
    restaurantIpAddress,
  );
  // create access token
  const accessToken = await createRestaurantAccessToken({
    restaurant,
    session,
  });
  // create refresh token
  const refreshToken = sign(session, {
    expiresIn: config.get('refreshTokenTtl'), // 1 year
  });
  // send access token and refresh token
  res.send({
    restaurant,
    accessToken,
    refreshToken,
  });
}

export async function invalidateSessionHandler(req: Request, res: Response) {
  const sessionId = get(req, 'user.session');
  log.info({ sessionId });
  await updateSession({ _id: sessionId }, { valid: false });
  res.sendStatus(200);
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = get(req, 'user._id');
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}
