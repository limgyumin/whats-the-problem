import { atom } from "recoil";
import { initialCreatePost } from "types/post/post.initial-state";
import { ICreatePost } from "types/post/post.type";

export const createPostState = atom<ICreatePost>({
  key: "createPostState",
  default: initialCreatePost,
});
