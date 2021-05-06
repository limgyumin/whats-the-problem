import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./HandleCreateHeader.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleCreateHeaderProps = {
  children: React.ReactNode;
  isPassed: boolean;
};

const HandleCreateHeader: React.FC<HandleCreateHeaderProps> = ({
  children,
  isPassed,
}) => {
  return (
    <div className={cx("handle-create-header", { headerPassed: isPassed })}>
      {children}
    </div>
  );
};

export default HandleCreateHeader;
