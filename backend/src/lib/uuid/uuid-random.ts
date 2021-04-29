import { extname } from 'path';
import { v4 as uuid4 } from 'uuid';

export const uuidRandom = (file: any): string => {
  return `${uuid4()}${extname(file.originalname)}`;
};

export const uuidCreate = (): string => {
  return uuid4();
};
