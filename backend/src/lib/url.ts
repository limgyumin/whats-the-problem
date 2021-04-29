import config from 'src/config';
import { RANDOM_CHARS, RANDOM_LENGTH } from 'src/constants/random-code';
import { createRandomCode } from './random-code';

export const generateURL = (filename: string): string => {
  const { SERVER } = config.APP;
  return `${SERVER}/public/${filename}`;
};

export const sliceURL = (url: string | null | undefined) => {
  return url ? url.substring(url.lastIndexOf('/') + 1) : null;
};

export const randomCodeURL = (url: string) => {
  return `${url}-${createRandomCode(RANDOM_LENGTH, RANDOM_CHARS)}`;
};
