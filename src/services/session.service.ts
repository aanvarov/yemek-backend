import config from 'config';
import { FilterQuery, LeanDocument, UpdateQuery } from 'mongoose';
import log from '../logger';
import Session, { SessionDocument } from '../models/session.model';
import { UserDocument } from '../models/user.model';
import { RestaurantDocument } from '../models/restaurant.model';
import { decode, sign } from '../utils/jwt.utils';
import { get } from 'lodash';
import { findUser } from './user.service';
import { findRestaurant } from './restaurant.service';

export async function createSession(userId: string, userAgent: string, userIpAddress: string) {
  const session = await Session.create({
    user: userId,
    userAgent,
    userIpAddress,
  });
  return session.toJSON();
}

// creating access token for user
export async function createUserAccessToken({
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

// creating access token for restaurant
export async function createRestaurantAccessToken({
  restaurant,
  session,
}: {
  restaurant:
    | Omit<RestaurantDocument, 'password'>
    | LeanDocument<Omit<RestaurantDocument, 'password'>>;
  session: Omit<SessionDocument, 'password'> | LeanDocument<Omit<SessionDocument, 'password'>>;
}) {
  // build and return the new access token
  const accessToken = sign(
    {
      ...restaurant,
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
  console.log('decodedddddd', decoded);

  if (!decoded || !get(decoded, '_id')) return false;

  // get the session
  const session = await Session.findById(get(decoded as any, '_id'));
  // making sure the session is valid
  if (!session && !session.valid) return false;

  // const { ...rest } = decoded;
  const isRestaurant = get(decoded as any, 'isRestaurant');
  let user: any;
  if (isRestaurant) {
    user = await findRestaurant({ _id: session.user });
  } else {
    user = await findUser({ _id: session.user });
  }

  if (!user) return false;

  const accessToken = await createUserAccessToken({ user, session });

  return accessToken;
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>,
) {
  return Session.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}
