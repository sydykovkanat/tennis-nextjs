import type { NextFunction, Response } from 'express';
import { User } from '../model/User';
import { RequestWithUser } from '../types/user';

export const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const headerValue = req.get('Authorization');

  if (!headerValue) {
    return res.status(401).send({ error: 'Header "Authorization" not found' });
  }

  const [_bearer, token] = headerValue.split(' ');

  if (!token) {
    return res.status(401).send({ error: 'Token not found' });
  }

  const user = await User.findOne({ token });

  if (!user) {
    return res.status(401).send({ error: 'Wrong Token!' });
  }

  req.user = user;

  return next();
};
