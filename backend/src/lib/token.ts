import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import { User } from 'src/user/model/user.model';
import config from '../config';

const JWT_SECRET = config.JWT.SECRET;

export const createToken = ({ id, password }: User) => {
  const payload = {
    id,
    password,
  };

  const options: SignOptions = {
    expiresIn: '30d',
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): string | object => {
  return jwt.verify(token, JWT_SECRET);
};
