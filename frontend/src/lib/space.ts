import { spacesRegExp } from "constants/regExp/spacesRegExp";

export const spaceToHyphen = (string: string) => {
  return string.replaceAll(" ", "-");
};

export const hyphenToSpace = (string: string) => {
  return string.replaceAll("-", " ");
};

export const removeSpace = (string: string) => {
  return string.replace(spacesRegExp, "");
};
