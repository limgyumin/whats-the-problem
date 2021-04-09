import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const uuidRandom = (file: any): string => {
  const uuidPath: string = `${uuid()}${extname(file.originalname)}`;
  return uuidPath;
};
