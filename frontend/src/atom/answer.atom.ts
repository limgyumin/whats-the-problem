import { atom } from "recoil";
import { IAnswer } from "types/answer/answer.type";

export const answersState = atom<IAnswer[]>({
  key: "answersState",
  default: [],
});
