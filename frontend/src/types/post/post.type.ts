import { ILike } from "../like/like.type";
import { ITag } from "../tag/tag.type";
import { IUser } from "../user/user.type";

export interface IPost {
  idx: number;
  title: string;
  content: string;
  thumbnail?: string;
  isTemp: string;
  likeCount: number;
  commentCount: number;
  user: IUser;
  tags: ITag[];
  likes: ILike[];
  createdAt: Date;
  updatedAt: Date;
}
