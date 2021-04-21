import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { ReactComponent as Person } from "assets/images/person.svg";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import { FiArrowRight } from "react-icons/fi";
import useLogin from "hooks/auth/useLogin";
import Input from "components/common/Input";
import { GITHUB_OAUTH } from "config/config.json";
import { GoMarkGithub } from "react-icons/go";

const styles = require("./SignIn.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const SignIn = () => {
  const {
    email,
    password,
    warning,
    changeEmailHandler,
    changePasswordHandler,
    submitUserHandler,
  } = useLogin();

  return (
    <div className={cx("signin")}>
      <div className={cx("signin-sidebar")}>
        <div className={cx("signin-sidebar-header")}>
          <Logo className={cx("signin-sidebar-header-logo")} />
          <h1 className={cx("signin-sidebar-header-title")}>
            Find the Problem,
            <br />
            Solve the Problem.
          </h1>
        </div>
        <Person className={cx("signin-sidebar-picture")} />
      </div>
      <div className={cx("signin-content")}>
        <div className={cx("signin-content-wrapper")}>
          <div className={cx("signin-content-wrapper-header")}>
            <div className={cx("signin-content-wrapper-header-text")}>
              <h1 className={cx("signin-content-wrapper-header-text-title")}>
                안녕하세요!
              </h1>
              <p className={cx("signin-content-wrapper-header-text-subtitle")}>
                What'sTheProblem 서비스를 이용하시려면 로그인 하세요.
              </p>
            </div>
          </div>

          <div className={cx("signin-content-wrapper-inputs")}>
            <Input
              name="이메일"
              value={email}
              placeholder="이메일을 입력해주세요."
              onChangeHandler={changeEmailHandler}
            />
            <Input
              name="비밀번호"
              value={password}
              type="password"
              placeholder="비밀번호을 입력해주세요."
              onChangeHandler={changePasswordHandler}
              warning={warning}
            />
          </div>
          <div className={cx("signin-content-wrapper-bottom")}>
            <a
              href={GITHUB_OAUTH}
              className={cx("signin-content-wrapper-bottom-github")}
            >
              <GoMarkGithub
                className={cx("signin-content-wrapper-bottom-github-icon")}
              />
            </a>
            <button
              className={cx("signin-content-wrapper-bottom-submit")}
              onClick={() => submitUserHandler()}
            >
              <FiArrowRight
                className={cx("signin-content-wrapper-bottom-submit-icon")}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
