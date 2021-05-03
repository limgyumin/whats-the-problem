import { IQuestion } from "./question.type";

export interface IQuestionsResult {
  questionCount: number;
  questions: IQuestion[];
}

export interface IQuestionResult {
  question: IQuestion;
}

export interface ICreateQuestionResult {
  createQuestion: IQuestion;
}
