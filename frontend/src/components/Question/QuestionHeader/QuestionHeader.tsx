import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import TagItem from "components/common/TagItem";
import { getTimeCount } from "lib/timeCount";
import React from "react";
import { ITag } from "types/tag/tag.type";
import { IUser } from "types/user/user.type";

const styles = require("./QuestionHeader.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type QuestionHeaderProps = {
  title: string;
  tags: ITag[];
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
  answerCount: number;
};

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  title,
  tags,
  user,
  createdAt,
  updatedAt,
  answerCount,
}) => {
  const { name } = user;

  return (
    <div className={cx("question-header")}>
      <h1 className={cx("question-header-title")}>{title}</h1>
      <p className={cx("question-header-info")}>
        <span>{name}</span>님이 {getTimeCount(createdAt)} 작성 ·{" "}
        <span>{answerCount}</span>
        개의 답변{" "}
        {createdAt !== updatedAt && ` · ${getTimeCount(updatedAt)} 수정`}
      </p>
      <div className={cx("question-header-tags")}>
        {tags.map((tag) => (
          <TagItem key={tag.idx} tag={tag} />
        ))}
      </div>
    </div>
  );
};

export default QuestionHeader;
