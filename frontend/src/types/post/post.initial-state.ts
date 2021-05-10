import { initialUser } from "types/user/user.initial-state";
import { ICreatePost, IPost } from "./post.type";

export const initialPost: IPost = {
  idx: 0,
  title: "",
  content: "",
  thumbnail: "",
  isTemp: false,
  likeCount: 0,
  commentCount: 0,
  user: initialUser,
  userIdx: 0,
  url: "",
  uuid: "",
  tags: [],
  likes: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const initialCreatePost: ICreatePost = {
  title: "",
  content: "",
  thumbnail: "",
  isTemp: false,
  url: "",
  tags: [],
};
