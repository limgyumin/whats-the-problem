import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { Link } from "react-router-dom";
import { ReactComponent as WriteHand } from "assets/images/write_hand.svg";
import { ReactComponent as Comments } from "assets/images/comments.svg";

const styles = require("./Write.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Write = () => {
  return (
    <div className={cx("write")}>
      <div className={cx("write-wrapper")}>
        <div className={cx("write-wrapper-text")}>
          <h1 className={cx("write-wrapper-text-title")}>
            What'sTheProblem 글 작성하기
          </h1>
          <p className={cx("write-wrapper-text-subtitle")}>
            궁금한 것이나 기록하고 싶은 것이 있나요? 지금 바로 작성해보세요!
          </p>
        </div>
        <div className={cx("write-wrapper-methods")}>
          <Link
            to="/write/question"
            className={cx("write-wrapper-methods-question")}
          >
            <Comments className={cx("write-wrapper-methods-question-image")} />
            <p className={cx("write-wrapper-methods-question-text")}>
              질문 작성하기
            </p>
          </Link>
          <Link to="/write/post" className={cx("write-wrapper-methods-post")}>
            <WriteHand className={cx("write-wrapper-methods-post-image")} />
            <p className={cx("write-wrapper-methods-post-text")}>글 작성하기</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Write;
