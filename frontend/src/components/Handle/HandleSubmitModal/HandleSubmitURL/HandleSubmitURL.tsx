import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React from "react";

const styles = require("./HandleSubmitURL.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleSubmitURLProps = {
  url: string;
};

const HandleSubmitURL: React.FC<HandleSubmitURLProps> = ({ url }) => {
  return (
    <div className={cx("handle-submit-url")}>
      <p className={cx("handle-submit-url-name")}>URL</p>
      <h1 className={cx("handle-submit-url-text")}>{url}</h1>
    </div>
  );
};

export default HandleSubmitURL;
