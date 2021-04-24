import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { IQuestion } from "types/question/question.type";
import { getTimeCount } from "lib/timeCount";
import TagItem from "components/common/TagItem";

const styles = require("./MainQuestionItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type MainQuestionItemProps = {
  lastElRef?: (node?: Element | null | undefined) => void;
  question: IQuestion;
};

const MainQuestionItem: React.FC<MainQuestionItemProps> = ({
  question,
  lastElRef,
}) => {
  const { title, content, tags, answerCount, user, createdAt } = question;
  return (
    <div className={cx("main-question-item")} ref={lastElRef}>
      <div className={cx("main-question-item-wrapper")}>
        <div className={cx("main-question-item-wrapper-area")}>
          <h2 className={cx("main-question-item-wrapper-area-title")}>
            {title}
          </h2>
          <p className={cx("main-question-item-wrapper-area-content")}>
            {content}
          </p>
        </div>
        <div className={cx("main-question-item-wrapper-tags")}>
          {tags.map((tag) => (
            <TagItem key={tag.idx} tag={tag} />
          ))}
        </div>
      </div>
      <div className={cx("main-question-item-info")}>
        <div className={cx("main-question-item-info-answers")}>
          <p className={cx("main-question-item-info-answers-count")}>
            {answerCount}
          </p>
          <p className={cx("main-question-item-info-answers-text")}>답변</p>
        </div>
        <p className={cx("main-question-item-info-created")}>
          {getTimeCount(createdAt)} · <span>{user.name}</span>님의 질문
        </p>
      </div>
    </div>
  );
};

export default MainQuestionItem;
