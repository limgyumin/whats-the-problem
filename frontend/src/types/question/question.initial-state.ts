import { initialUser } from "types/user/user.initial-state";
import { ICreateQuestion, IQuestion } from "./question.type";

export const initialCreateQuestion: ICreateQuestion = {
  title: "",
  content: "",
  tags: [],
  isTemp: false,
  url: "",
};

export const initialQuestion: IQuestion = {
  idx: 0,
  title: "",
  content: "",
  isTemp: false,
  user: initialUser,
  userIdx: 0,
  url: "",
  tags: [],
  answers: [],
  answerCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};
