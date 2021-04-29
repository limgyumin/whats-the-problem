import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React from "react";
import { IUser } from "types/user/user.type";
import defaultProfile from "assets/images/profile.svg";
import { getTimeCount } from "lib/timeCount";
import MarkDown from "components/common/MarkDown";

const styles = require("./AnswerItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type AnswerItemType = {
  content: string;
  user: IUser;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
  questionUserIdx: number;
};

const AnswerItem: React.FC<AnswerItemType> = ({
  content,
  user,
  commentCount,
  updatedAt,
  createdAt,
  questionUserIdx,
}) => {
  const { avatar, name } = user;

  return (
    <div className={cx("answer-item")}>
      <div className={cx("answer-item-user")}>
        <div className={cx("answer-item-user-container")}>
          <img
            src={avatar || defaultProfile}
            alt="Profile"
            className={cx("answer-item-user-container-avatar")}
          />
          <p className={cx("answer-item-user-container-info")}>
            <span>{name}</span>님이 {getTimeCount(updatedAt)}에 작성한 답변
            {commentCount > 0 && ` · ${commentCount}개의 댓글`}
            {createdAt !== updatedAt && ` · ${getTimeCount(updatedAt)} 수정`}
          </p>
        </div>
        {questionUserIdx === user.idx && (
          <p className={cx("answer-item-user-role")}>작성자</p>
        )}
      </div>
      <div className={cx("answer-item-wrapper")}>
        <MarkDown>{content}</MarkDown>
      </div>
    </div>
  );
};

export default AnswerItem;
