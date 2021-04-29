import { IAnswer } from "../answer/answer.type";
import { ICreateTag, ITag } from "../tag/tag.type";
import { IUser } from "../user/user.type";

export interface IQuestion {
  idx: number;
  title: string;
  content: string;
  isTemp: boolean;
  user: IUser;
  userIdx: number;
  url: string;
  tags: ITag[];
  answers: IAnswer[];
  answerCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateQuestion {
  title: string;
  content: string;
  tags: ICreateTag[];
  isTemp?: boolean;
  url: string;
}
