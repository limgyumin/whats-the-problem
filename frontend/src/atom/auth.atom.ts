import { atom } from "recoil";
import {
  initialCreateUser,
  initialGitHubUser,
  initialUserShortInfo,
} from "types/user/user.initial-state";
import { ICreateUser, IGitHubUser, IUserShortInfo } from "types/user/user.type";

export const gitHubUserState = atom<IGitHubUser>({
  key: "gitHubUserState",
  default: initialGitHubUser,
});

export const createUserState = atom<ICreateUser>({
  key: "createUserState",
  default: initialCreateUser,
});

export const loginState = atom<boolean>({
  key: "loginState",
  default: false,
});

export const myProfileState = atom<IUserShortInfo>({
  key: "myProfileState",
  default: initialUserShortInfo,
});
