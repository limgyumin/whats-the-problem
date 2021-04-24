import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { Link } from "react-router-dom";

const styles = require("./HeaderAction.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const HeaderAction = () => {
  return (
    <div className={cx("header-action")}>
      <Link to="/signin" className={cx("header-action-signin")}>
        <p className={cx("header-action-signin-text")}>Sign in</p>
      </Link>
      <Link to="/signup" className={cx("header-action-signup")}>
        <p className={cx("header-action-signup-text")}>Sign up</p>
      </Link>
    </div>
  );
};

export default HeaderAction;
