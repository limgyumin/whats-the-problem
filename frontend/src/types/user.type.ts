import { IPost } from "./post.type";
import { IQuestion } from "./question.type";

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

export interface IGitHubUserResponse {
  gitHubUser: IGitHubUser;
}

export interface IGitHubAuthResponse {
  gitHubAuth: string;
}

export interface IGitHubUser {
  avatar: string;
  name: string;
  bio: string;
  email: string;
  gitHubId: string;
}
