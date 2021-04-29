import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import MarkDown from "components/common/MarkDown";
import { IUser } from "types/user/user.type";
import { getTimeCount } from "lib/timeCount";
import defaultProfile from "assets/images/profile.svg";

const styles = require("./QuestionContent.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type QuestionContentType = {
  content: string;
  user: IUser;
  updatedAt: Date;
};

const QuestionContent: React.FC<QuestionContentType> = ({
  content,
  user,
  updatedAt,
}) => {
  const { avatar, name } = user;

  return (
    <div className={cx("question-content")}>
      <div className={cx("question-content-user")}>
        <div className={cx("question-content-user-container")}>
          <img
            src={avatar || defaultProfile}
            alt="Profile"
            className={cx("question-content-user-container-avatar")}
          />
          <p className={cx("question-content-user-container-info")}>
            <span>{name}</span>님이 {getTimeCount(updatedAt)}에 작성한 질문
          </p>
        </div>
      </div>
      <div className={cx("question-content-wrapper")}>
        <MarkDown>{content}</MarkDown>
      </div>
    </div>
  );
};

export default QuestionContent;
