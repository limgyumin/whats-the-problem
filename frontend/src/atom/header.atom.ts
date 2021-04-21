import { atom } from "recoil";

export const showMenuState = atom<boolean>({
  key: "showMenuState",
  default: false,
});
