import { ICreateUser, IGitHubUser, IUser, IUserShortInfo } from "./user.type";

export const initialUser: IUser = {
  idx: 0,
  avatar: "",
  gitHubId: "",
  email: "",
  password: "",
  name: "",
  id: "",
  bio: "",
  score: 0,
  isAdmin: false,
  createdAt: new Date(),
  posts: [],
  questions: [],
};

export const initialGitHubUser: IGitHubUser = {
  avatar: "",
  name: "",
  id: "",
  bio: "",
  email: "",
  gitHubId: "",
  isNew: false,
};

export const initialCreateUser: ICreateUser = {
  avatar: "",
  email: "",
  password: "",
  id: "",
  name: "",
  bio: "",
};

export const initialUserShortInfo: IUserShortInfo = {
  avatar: "",
  name: "",
  id: "",
  bio: "",
};
