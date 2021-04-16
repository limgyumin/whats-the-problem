import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

type AuthTemplateProps = {
  children: React.ReactNode;
};

const styles = require("./AuthTemplate.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const AuthTemplate = ({ children }: AuthTemplateProps) => {
  return (
    <div className={cx("auth-template")}>
      <div className={cx("auth-template-wrapper")}>{children}</div>
    </div>
  );
};

export default AuthTemplate;
