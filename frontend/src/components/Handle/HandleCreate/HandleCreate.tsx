import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./HandleCreate.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleCreateProps = {
  children: React.ReactNode;
};

const HandleCreate: React.FC<HandleCreateProps> = ({ children }) => {
  return <div className={cx("handle-create")}>{children}</div>;
};

export default HandleCreate;
