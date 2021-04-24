import { IPost } from "../post/post.type";
import { IQuestion } from "../question/question.type";

export interface ITag {
  idx: number;
  name: string;
  posts: IPost[];
  questions: IQuestion[];
  postCount: number;
}
