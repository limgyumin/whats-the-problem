import { IAnswer } from "./answer.type";
import { ITag } from "./tag.type";
import { IUser } from "./user.type";

export interface IQuestion {
  idx: number;
  title: string;
  content: string;
  isTemp: boolean;
  user: IUser;
  tags: ITag[];
  answers: IAnswer[];
  answerCount: number;
  createdAt: Date;
  updatedAt: Date;
}
