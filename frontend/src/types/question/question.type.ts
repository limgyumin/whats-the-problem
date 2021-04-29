import { IAnswer } from "../answer/answer.type";
import { ITag } from "../tag/tag.type";
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
