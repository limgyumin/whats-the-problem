import { atom } from "recoil";
import { IQuestion } from "types/question/question.type";

export const questionsState = atom<IQuestion[]>({
  key: "questionsState",
  default: [],
});

export const questionCountState = atom<number>({
  key: "questionCountState",
  default: 0,
});

export const questionPageState = atom<number>({
  key: "questionPageState",
  default: 1,
});

export const questionState = atom<IQuestion>({
  key: "questionState",
  default: {} as IQuestion,
});
