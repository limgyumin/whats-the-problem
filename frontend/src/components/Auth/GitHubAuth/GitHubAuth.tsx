import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useGitHubAuth from "hooks/auth/useGitHubAuth";
import profile from "assets/images/profile.svg";
import { FiArrowRight } from "react-icons/fi";
import GitHubLoading from "../GitHubLoading";
import Input from "components/common/Input";

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
        <Input
          name="이름"
          value={name}
          placeholder="이름을 입력해주세요."
          maxLength={16}
          onChangeHandler={changeNameHandler}
          warning={warning}
        />
        <Input
          name="한 줄 소개"
          value={bio}
          placeholder="본인을 한 줄로 소개해보세요."
          onChangeHandler={changeBioHandler}
        />
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
