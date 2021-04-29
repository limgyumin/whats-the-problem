import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

type TemplateProps = {
  children: React.ReactNode;
};

const styles = require("./Template.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Template: React.FC<TemplateProps> = ({ children }) => {
  return (
    <div className={cx("template")}>
      <div className={cx("template-wrapper")}>{children}</div>
    </div>
  );
};

export default Template;
