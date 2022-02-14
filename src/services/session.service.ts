import config from 'config';
import { FilterQuery, LeanDocument, UpdateQuery } from 'mongoose';
import log from '../logger';
import Session, { SessionDocument } from '../models/session.model';
import { UserDocument } from '../models/user.model';
import { decode, sign } from '../utils/jwt.utils';
import { get } from 'lodash';
import { findUser } from './user.service';

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({
    user: userId,
    userAgent,
  });
  return session.toJSON();
}

export async function createAccessToken({
  user,
  session,
}: {
  user: Omit<UserDocument, 'password'> | LeanDocument<Omit<UserDocument, 'password'>>;
  session: Omit<SessionDocument, 'password'> | LeanDocument<Omit<SessionDocument, 'password'>>;
}) {
  // build and return the new access token
  const accessToken = sign(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get('accessTokenTtl'),
    },
  );
  // log.info(accessToken);

  return accessToken;
}

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
  // decode the refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, '_id')) return false;

  // get the session
  const session = await Session.findById(get(decoded as any, '_id'));
  // making sure the session is valid
  if (!session && !session.valid) return false;

  const user = await findUser({ _id: session.user });
  if (!user) return false;

  const accessToken = await createAccessToken({ user, session });

  return accessToken;
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>,
) {
  return Session.updateOne(query, update);
}
