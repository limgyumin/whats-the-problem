import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./HandleContent.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleContentProps = {
  children: React.ReactNode;
};

const HandleContent: React.FC<HandleContentProps> = ({ children }) => {
  return <div className={cx("handle-content")}>{children}</div>;
};

export default HandleContent;
