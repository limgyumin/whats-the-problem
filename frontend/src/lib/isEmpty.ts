import { removeSpace } from "./removeSpace";

export const isEmpty = (string: string | undefined): boolean => {
  if (!string) {
    return true;
  }
  return removeSpace(string) === "";
};
