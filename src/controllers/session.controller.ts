import { Request, Response } from 'express';
import { validatePassword } from '../services/user.service';
import {
  createSession,
  createAccessToken,
  updateSession,
  findSessions,
} from '../services/session.service';
import { sign } from '../utils/jwt.utils';
import config from 'config';
import log from '../logger';
import { get } from 'lodash';

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the email and password
  const user = await validatePassword(req.body);
  const userIpAddress = await get(req, 'socket.remoteAddress');
  if (!user) {
    return res.status(401).send('Invalid email or password');
  }
  // create session
  const session = await createSession(user._id, req.get('user-agent' || ''), userIpAddress);
  // create access token

  const accessToken = await createAccessToken({
    user,
    session,
  });

  // create refresh token

  const refreshToken = sign(session, {
    expiresIn: config.get('refreshTokenTtl'), // 1 year
  });

  // send access token and refresh token

  res.send({
    accessToken,
    refreshToken,
  });
}

export async function invalidateUserSessionHandler(req: Request, res: Response) {
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
