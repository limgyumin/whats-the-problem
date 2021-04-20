import { atom } from "recoil";
import { ICreateUser, IGitHubUser } from "types/user/user.type";

export const gitHubUserState = atom<IGitHubUser>({
  key: "gitHubUserState",
  default: {} as IGitHubUser,
});

export const createUserState = atom<ICreateUser>({
  key: "createUserState",
  default: {} as ICreateUser,
});

export const loginState = atom<boolean>({
  key: "loginState",
  default: false,
});
