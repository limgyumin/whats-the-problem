import { IQuestion } from "./question.type";

export interface IQuestionsResult {
  questionCount: number;
  questions: IQuestion[];
}
