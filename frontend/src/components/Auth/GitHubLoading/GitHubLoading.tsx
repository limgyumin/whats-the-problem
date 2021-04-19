import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { FlagSpinner } from "react-spinners-kit";

const styles = require("./GitHubLoading.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const GitHubLoading = () => {
  return (
    <div className={cx("github-auth-loading")}>
      <h1 className={cx("github-auth-loading-title")}>
        GitHub와 동기화 하는 중...
      </h1>
      <p className={cx("github-auth-loading-subtitle")}>
        조금만 기다려주세요. 사용자 정보를 받아오고 있어요.
      </p>
      <FlagSpinner size={80} color={"#7a818d"} />
    </div>
  );
};

export default GitHubLoading;
