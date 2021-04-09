import 'dotenv/config';
import { Logger } from '@nestjs/common';

const getEnv = (name: string) => {
  const value = process.env[name];

  if (value === undefined) {
    const err = `${name} 환경 변수가 정의되지 않았습니다.`;
    Logger.error(err, 'getEnv');
    throw new Error(err);
  }

  return value;
};

export default {
  APP: {
    PORT: parseInt(getEnv('PORT')),
    SERVER: getEnv('SERVER'),
  },
  JWT: {
    SECRET: getEnv('JWT_SECRET'),
  },
  GITHUB: {
    CLIENT_ID: getEnv('CLIENT_ID'),
    CLIENT_SECRET: getEnv('CLIENT_SECRET'),
  },
  NODEMAILER: {
    USER: getEnv('NODEMAILER_USER'),
    PASS: getEnv('NODEMAILER_PASS'),
  },
};
