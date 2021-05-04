import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./HandleCreateHeader.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleCreateHeaderProps = {
  children: React.ReactNode;
};

const HandleCreateHeader: React.FC<HandleCreateHeaderProps> = ({
  children,
}) => {
  return <div className={cx("handle-create-header")}>{children}</div>;
};

export default HandleCreateHeader;
