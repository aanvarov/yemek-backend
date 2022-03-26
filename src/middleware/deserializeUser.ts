import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { decode } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../services/session.service';
import log from '../logger';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
  const refreshToken = get(req, 'headers.x-refresh-token').replace(/^Bearer\s/, '');
  // log.info({ remoteIp: get(req, 'socket.remoteAddress') });

  if (!accessToken) return next();

  const { decoded, expired } = decode(accessToken);
  // log.info({ expiredToken: expired });

  if (decoded) {
    // @ts-ignore
    req.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    console.log('newAccessToken', newAccessToken);
    if (newAccessToken) {
      // Add the new access token to the response header
      res.setHeader('x-access-token', newAccessToken);
      // tslint:disable-next-line: no-shadowed-variable
      const { decoded } = decode(newAccessToken);

      // @ts-ignore
      req.user = decoded;
    }

    return next();
  }

  return next();
};

export default deserializeUser;
