import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useFetchQuestion from "hooks/question/useFetchQuestion";
import QuestionHeader from "./QuestionHeader";
import QuestionContent from "./QuestionContent";
import Answer from "components/Answer";

const styles = require("./Question.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Question = () => {
  const { question } = useFetchQuestion();

  const {
    title,
    content,
    tags,
    user,
    createdAt,
    updatedAt,
    answerCount,
  } = question;

  return (
    <div className={cx("question")}>
      <div className={cx("question-wrapper")}>
        {question.idx && (
          <React.Fragment>
            <QuestionHeader
              title={title}
              tags={tags}
              user={user}
              createdAt={createdAt}
              updatedAt={updatedAt}
              answerCount={answerCount}
            />
            <QuestionContent
              content={content}
              user={user}
              updatedAt={updatedAt}
            />
            <Answer />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Question;
