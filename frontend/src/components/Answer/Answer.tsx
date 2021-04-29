import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useFetchAnswers from "hooks/answer/useFetchAnswers";
import AnswerItem from "./AnswerItem";

const styles = require("./Answer.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Answer = () => {
  const { loading, answers, questionUserIdx } = useFetchAnswers();

  return (
    !loading && (
      <div className={cx("answer")}>
        {answers.map((answer) => {
          const {
            idx,
            content,
            user,
            commentCount,
            createdAt,
            updatedAt,
          } = answer;
          return (
            <AnswerItem
              key={idx}
              content={content}
              user={user}
              createdAt={createdAt}
              updatedAt={updatedAt}
              questionUserIdx={questionUserIdx}
              commentCount={commentCount}
            />
          );
        })}
      </div>
    )
  );
};

export default Answer;
