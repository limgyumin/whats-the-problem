import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import { Link } from "react-router-dom";

const styles = require("./Header.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Header = () => {
  return (
    <header className={cx("header")}>
      <div className={cx("header-wrapper")}>
        <Logo className={cx("header-wrapper-logo")} />
        <div className={cx("header-wrapper-actions")}>
          <Link to="/signin" className={cx("header-wrapper-actions-signin")}>
            <p className={cx("header-wrapper-actions-signin-text")}>Sign in</p>
          </Link>
          <Link to="/signup" className={cx("header-wrapper-actions-signup")}>
            <p className={cx("header-wrapper-actions-signup-text")}>Sign up</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
