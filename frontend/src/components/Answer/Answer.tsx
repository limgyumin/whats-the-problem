import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useFetchAnswers from "hooks/answer/useFetchAnswers";
import AnswerItem from "./AnswerItem";
import HandleAnswer from "./HandleAnswer";
import useCreateAnswer from "hooks/answer/useCreateAnswer";

const styles = require("./Answer.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Answer = () => {
  const {
    content,
    contentRef,
    changeContentHandler,
    submitAnswerHandler,
  } = useCreateAnswer();
  const { answers, questionUserIdx } = useFetchAnswers();

  return (
    <div className={cx("answer")}>
      {answers.length > 0 && (
        <div className={cx("answer-list")}>
          {answers.map((answer) => {
            return (
              <AnswerItem
                key={answer.idx}
                questionUserIdx={questionUserIdx}
                answer={answer}
              />
            );
          })}
        </div>
      )}
      <div className={cx("answer-handle")}>
        <HandleAnswer
          content={content}
          contentRef={contentRef}
          changeContentHandler={changeContentHandler}
          completeHandler={submitAnswerHandler}
        />
      </div>
    </div>
  );
};

export default Answer;
