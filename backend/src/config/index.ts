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
  },
  JWT: {
    SECRET: getEnv('JWT_SECRET'),
  },
};
