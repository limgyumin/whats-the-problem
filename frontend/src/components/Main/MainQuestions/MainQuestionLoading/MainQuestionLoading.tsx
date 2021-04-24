import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./MainQuestionLoading.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const MainQuestionLoading = () => {
  return (
    <div className={cx("main-question-loading")}>
      <div className={cx("main-question-loading-wrapper")}>
        <div className={cx("main-question-loading-wrapper-title")} />
        <div className={cx("main-question-loading-wrapper-content")} />
        <div className={cx("main-question-loading-wrapper-content")} />
        <div className={cx("main-question-loading-wrapper-tags")}>
          <span className={"main-question-loading-wrapper-tags-item"} />
          <span className={"main-question-loading-wrapper-tags-item"} />
          <span className={"main-question-loading-wrapper-tags-item"} />
          <span className={"main-question-loading-wrapper-tags-item"} />
          <span className={"main-question-loading-wrapper-tags-item"} />
        </div>
      </div>
      <div className={cx("main-question-loading-info")}>
        <span className={cx("main-question-loading-info-answers")} />
      </div>
    </div>
  );
};

export default MainQuestionLoading;
