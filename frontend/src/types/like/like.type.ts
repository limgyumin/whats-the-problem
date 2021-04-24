import { IPost } from "../post/post.type";
import { IUser } from "../user/user.type";

export interface ILike {
  idx: number;
  liked: boolean;
  user: IUser;
  post: IPost;
}
