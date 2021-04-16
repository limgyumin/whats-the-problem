import { IPost } from "./post.type";
import { IUser } from "./user.type";

export interface ILike {
  idx: number;
  liked: boolean;
  user: IUser;
  post: IPost;
}
