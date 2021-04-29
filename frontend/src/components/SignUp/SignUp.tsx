import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { ReactComponent as Icon } from "assets/images/icon.svg";
import { GoMarkGithub } from "react-icons/go";
import { IoArrowForwardCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { GITHUB_OAUTH } from "config/config.json";

const styles = require("./SignUp.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const SignUp = () => {
  return (
    <div className={cx("signup")}>
      <div className={cx("signup-wrapper")}>
        <div className={cx("signup-wrapper-text")}>
          <h1 className={cx("signup-wrapper-text-title")}>
            What'sTheProblem <span>시작하기</span>
          </h1>
          <p className={cx("signup-wrapper-text-subtitle")}>
            안녕하세요! 서비스 이용을 위한 회원가입 방법을 선택해주세요.
          </p>
        </div>
        <div className={cx("signup-wrapper-methods")}>
          <Link
            to="/signup/email"
            className={cx("signup-wrapper-methods-local")}
          >
            <Icon className={cx("signup-wrapper-methods-local-icon")} />
            <p className={cx("signup-wrapper-methods-local-text")}>
              Sign up with
              <br />
              <span>What'sTheProblem</span>
            </p>
            <IoArrowForwardCircle
              className={cx("signup-wrapper-methods-local-arrow")}
            />
          </Link>
          <a
            href={GITHUB_OAUTH}
            className={cx("signup-wrapper-methods-github")}
          >
            <GoMarkGithub
              className={cx("signup-wrapper-methods-github-icon")}
            />
            <p className={cx("signup-wrapper-methods-github-text")}>
              Sign up with
              <br />
              <span>GitHub</span>
            </p>
            <IoArrowForwardCircle
              className={cx("signup-wrapper-methods-github-arrow")}
            />
          </a>
        </div>
        <div className={cx("signup-wrapper-signin")}>
          <p className={cx("signup-wrapper-signin-text")}>
            이미 계정이 있으신가요?
          </p>
          <Link to="/signin" className={cx("signup-wrapper-signin-link")}>
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
