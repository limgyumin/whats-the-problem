import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React from "react";

const styles = require("./HandleSubmitTitle.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleSubmitTitleProps = {
  title: string;
};

const HandleSubmitTitle: React.FC<HandleSubmitTitleProps> = ({ title }) => {
  return (
    <div className={cx("handle-submit-title")}>
      <p className={cx("handle-submit-title-name")}>제목</p>
      <h1 className={cx("handle-submit-title-text")}>{title}</h1>
    </div>
  );
};

export default HandleSubmitTitle;
