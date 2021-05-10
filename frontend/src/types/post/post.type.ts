import { ILike } from "../like/like.type";
import { ICreateTag, ITag } from "../tag/tag.type";
import { IUser } from "../user/user.type";

export interface IPost {
  idx: number;
  title: string;
  content: string;
  thumbnail?: string;
  isTemp: boolean;
  likeCount: number;
  commentCount: number;
  user: IUser;
  userIdx: number;
  url: string;
  uuid: string;
  tags: ITag[];
  likes: ILike[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreatePost {
  title: string;
  content: string;
  thumbnail?: string;
  isTemp?: boolean;
  url: string;
  tags: ICreateTag[];
}
