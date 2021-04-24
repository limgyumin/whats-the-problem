import { IQuestion } from "../question/question.type";
import { IUser } from "../user/user.type";

export interface IAnswer {
  idx: number;
  content: string;
  user: IUser;
  commentCount: number;
  question: IQuestion;
  createdAt: Date;
  updatedAt: Date;
}
