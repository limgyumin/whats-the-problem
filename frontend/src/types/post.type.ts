import { ILike } from "./like.type";
import { ITag } from "./tag.type";
import { IUser } from "./user.type";

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
