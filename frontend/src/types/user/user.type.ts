import { IPost } from "../post/post.type";
import { IQuestion } from "../question/question.type";

export interface IUser {
  idx: number;
  avatar: string;
  gitHubId: string;
  email: string;
  password: string;
  name: string;
  bio: string;
  score: number;
  isAdmin: boolean;
  createdAt: Date;
  posts: IPost[];
  questions: IQuestion[];
}

export interface IUserShortInfo {
  avatar: string;
  name: string;
  bio: string;
}

export interface IUserDetailInfo {}

export interface IGitHubUser {
  avatar: string;
  name: string;
  bio: string;
  email: string;
  gitHubId: string;
  isNew?: boolean;
}

export interface ICreateUser {
  avatar: string;
  email: string;
  password: string;
  name: string;
  bio: string;
}
