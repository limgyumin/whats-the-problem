import { IGitHubUser, IUserShortInfo } from "./user.type";

export interface IMyProfileResult {
  me: IUserShortInfo;
}

export interface IGitHubUserResult {
  gitHubUser: IGitHubUser;
}

export interface IGitHubAuthResult {
  gitHubAuth: string;
}

export interface IRegisterResult {
  register: string;
}

export interface ILoginResult {
  login: string;
}
