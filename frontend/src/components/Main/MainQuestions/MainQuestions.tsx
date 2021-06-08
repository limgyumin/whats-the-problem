import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useFetchQuestions from "hooks/question/useFetchQuestions";
import MainQuestionItem from "./MainQuestionItem";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import MainQuestionLoading from "./MainQuestionLoading";

const styles = require("./MainQuestions.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const MainQuestions = () => {
  const { isRecent, loading, questions, lastElRef } = useFetchQuestions();

  return (
    <div className={cx("main-questions")}>
      <div className={cx("main-questions-header")}>
        <RiQuestionAnswerLine className={cx("main-questions-header-icon")} />
        <h1 className={cx("main-questions-header-title")}>질문 목록</h1>
      </div>
      <div className={cx("main-questions-sort")}>
        <div className={cx("main-questions-sort-wrapper")}>
          <Link to="/" className={cx("main-questions-sort-wrapper-recent")}>
            <p
              className={cx("main-questions-sort-wrapper-recent-text", {
                active: isRecent,
              })}
            >
              최근 순
            </p>
          </Link>
          <Link
            to="/?sort=answer"
            className={cx("main-questions-sort-wrapper-answer")}
          >
            <p
              className={cx("main-questions-sort-wrapper-answer-text", {
                active: !isRecent,
              })}
            >
              답변 순
            </p>
          </Link>
          <div
            className={cx("main-questions-sort-wrapper-bottom", {
              move: !isRecent,
            })}
          />
        </div>
      </div>
      <div className={cx("main-questions-list")}>
        {questions.map((question, idx) =>
          questions.length - 1 === idx ? (
            <MainQuestionItem
              key={question.idx}
              lastElRef={lastElRef}
              question={question}
            />
          ) : (
            <MainQuestionItem key={question.idx} question={question} />
          )
        )}
        {loading && (
          <React.Fragment>
            <MainQuestionLoading />
            <MainQuestionLoading />
            <MainQuestionLoading />
            <MainQuestionLoading />
            <MainQuestionLoading />
            <MainQuestionLoading />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default MainQuestions;
