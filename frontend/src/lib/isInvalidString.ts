export const isInvalidString = (string: string, regExp: RegExp): boolean => {
  return !regExp.test(string);
};
