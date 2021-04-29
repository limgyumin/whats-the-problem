import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { ReactComponent as Logo } from "assets/images/logo_white.svg";
import { ReactComponent as Boxes } from "assets/images/boxes.svg";

const styles = require("./SignInSideBar.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const SignInSideBar = () => {
  return (
    <div className={cx("signin-sidebar")}>
      <div className={cx("signin-sidebar-header")}>
        <Logo className={cx("signin-sidebar-header-logo")} />
        <div className={cx("signin-sidebar-header-content")}>
          <h1 className={cx("signin-sidebar-header-content-title")}>
            당신의 문제는
            <br />
            무엇인가요?
          </h1>
          <p className={cx("signin-sidebar-header-content-subtitle")}>
            지금 바로 What'sTheProblem에서
            <br />
            해결책을 찾아보세요.
          </p>
        </div>
      </div>
      <div className={cx("signin-sidebar-picture")}>
        <Boxes className={cx("signin-sidebar-picture-image")} />
      </div>
    </div>
  );
};

export default SignInSideBar;
