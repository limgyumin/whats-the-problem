import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useFetchQuestions from "hooks/question/useFetchQuestions";
import MainQuestionItem from "./MainQuestionItem";
import { MdQuestionAnswer } from "react-icons/md";
import { Link } from "react-router-dom";
import Template from "components/Templates/Template";
import MainQuestionLoading from "./MainQuestionLoading";

const styles = require("./MainQuestions.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const MainQuestions = () => {
  const { isRecent, loading, questions, lastElRef } = useFetchQuestions();

  return (
    <Template>
      <div className={cx("main-questions")}>
        <div className={cx("main-questions-header")}>
          <MdQuestionAnswer className={cx("main-questions-header-icon")} />
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
          {questions.map((question, idx) =>
            questions.length - 1 === idx ? (
              <MainQuestionItem
                key={question.idx}
                lastElRef={lastElRef}
                question={question}
              />
            ) : (
              <MainQuestionItem key={idx} question={question} />
            )
          )}
        </div>
      </div>
    </Template>
  );
};

export default MainQuestions;
