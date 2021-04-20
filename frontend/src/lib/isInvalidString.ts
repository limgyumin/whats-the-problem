import { isEmpty } from "./isEmpty";

export const isInvalidString = (string: string, regExp: RegExp): boolean => {
  return isEmpty(string) || !regExp.test(string);
};
