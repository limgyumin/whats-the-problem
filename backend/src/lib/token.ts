import {
  GoneException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
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

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const validateToken = (auth: string) => {
  if (auth.split(' ')[0] !== 'Bearer') {
    throw new UnauthorizedException('Invalid token.');
  }

  const token = auth.split(' ')[1];

  try {
    return verifyToken(token);
  } catch (error) {
    switch (error.message) {
      case 'INVALID_TOKEN':
      case 'TOKEN_IS_EMPTY':
      case 'NO_USER':
        throw new UnauthorizedException('Invalid token.');

      case 'EXPIRED_TOKEN':
        throw new GoneException('Expired token.');

      default:
        throw new InternalServerErrorException('Internal server error.');
    }
  }
};
