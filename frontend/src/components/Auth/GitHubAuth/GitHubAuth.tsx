import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useGitHubAuth from "hooks/auth/useGitHubAuth";
import profile from "assets/images/profile.svg";
import { FiArrowRight } from "react-icons/fi";
import GitHubLoading from "../GitHubLoading";

const styles = require("./GitHubAuth.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const GitHubAuth = () => {
  const {
    loading,
    warning,
    user,
    changeNameHandler,
    changeBioHandler,
    submitUserHandler,
  } = useGitHubAuth();

  const { avatar, name, bio } = user;

  return loading ? (
    <GitHubLoading />
  ) : (
    <div className={cx("github-auth")}>
      <div className={cx("github-auth-header")}>
        <div className={cx("github-auth-header-text")}>
          <h1 className={cx("github-auth-header-text-title")}>
            반가워요, {name}님.
          </h1>
          <p className={cx("github-auth-header-text-subtitle")}>
            회원님의 기본 회원 정보를 작성해주세요!
          </p>
        </div>
        <img
          src={avatar || profile}
          alt={"profile"}
          className={cx("github-auth-header-avatar")}
        />
      </div>
      <div className={cx("github-auth-inputs")}>
        <div className={cx("github-auth-inputs-wrapper")}>
          <h4 className={cx("github-auth-inputs-wrapper-text")}>이름</h4>
          <input
            value={name}
            type="text"
            placeholder="이름을 입력해주세요."
            maxLength={16}
            onChange={(e) => changeNameHandler(e)}
          />
          {warning && (
            <h4 className={cx("github-auth-inputs-wrapper-warning")}>
              {warning}
            </h4>
          )}
        </div>
        <div className={cx("github-auth-inputs-wrapper")}>
          <h4 className={cx("github-auth-inputs-wrapper-text")}>한 줄 소개</h4>
          <input
            value={bio}
            type="text"
            placeholder="본인을 한 줄로 소개해보세요."
            onChange={(e) => changeBioHandler(e)}
          />
        </div>
      </div>
      <div className={cx("github-auth-bottom")}>
        <button
          className={cx("github-auth-bottom-submit")}
          onClick={() => submitUserHandler()}
        >
          <FiArrowRight className={cx("github-auth-bottom-submit-icon")} />
        </button>
      </div>
    </div>
  );
};

export default GitHubAuth;
