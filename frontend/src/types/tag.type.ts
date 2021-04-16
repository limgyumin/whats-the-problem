import { IPost } from "./post.type";
import { IQuestion } from "./question.type";

export interface ITag {
  idx: number;
  name: string;
  posts: IPost[];
  questions: IQuestion[];
  postCount: number;
}
