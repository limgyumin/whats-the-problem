import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import profile from "assets/images/profile.svg";
import { FiArrowRight } from "react-icons/fi";
import useLocalAuth from "hooks/auth/useLocalAuth";
import { isEmpty } from "lib/isEmpty";
import { IoMdLock } from "react-icons/io";

const styles = require("./LocalAuth.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const LocalAuth = () => {
  const {
    user,
    passwordWarning,
    nameWarning,
    changePasswordHandler,
    changeNameHandler,
    changeBioHandler,
    submitUserHandler,
  } = useLocalAuth();
  const { email } = user;

  return (
    <div className={cx("local-auth")}>
      <div className={cx("local-auth-header")}>
        <div className={cx("local-auth-header-text")}>
          <h1 className={cx("local-auth-header-text-title")}>환영합니다!</h1>
          <p className={cx("local-auth-header-text-subtitle")}>
            회원님의 기본 회원 정보를 작성해주세요!
          </p>
        </div>
        <img
          src={profile}
          alt={"profile"}
          className={cx("local-auth-header-avatar")}
        />
      </div>
      <div className={cx("local-auth-inputs")}>
        <div className={cx("local-auth-inputs-wrapper")}>
          <h4 className={cx("local-auth-inputs-wrapper-text")}>이메일</h4>
          <div className={cx("local-auth-inputs-wrapper-input")}>
            <input
              className={cx("local-auth-inputs-wrapper-input-element")}
              readOnly={!isEmpty(email)}
              value={email}
              type="text"
              placeholder="이메일을 입력해주세요."
            />
            {email && (
              <IoMdLock
                className={cx("local-auth-inputs-wrapper-input-icon")}
              />
            )}
          </div>
        </div>
        <div className={cx("local-auth-inputs-wrapper")}>
          <h4 className={cx("local-auth-inputs-wrapper-text")}>비밀번호</h4>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={(e) => changePasswordHandler(e)}
          />
          {passwordWarning && (
            <h4 className={cx("local-auth-inputs-wrapper-warning")}>
              {passwordWarning}
            </h4>
          )}
        </div>
        <div className={cx("local-auth-inputs-wrapper")}>
          <h4 className={cx("local-auth-inputs-wrapper-text")}>이름</h4>
          <input
            type="text"
            placeholder="이름을 입력해주세요."
            maxLength={16}
            onChange={(e) => changeNameHandler(e)}
          />
          {nameWarning && (
            <h4 className={cx("local-auth-inputs-wrapper-warning")}>
              {nameWarning}
            </h4>
          )}
        </div>
        <div className={cx("local-auth-inputs-wrapper")}>
          <h4 className={cx("local-auth-inputs-wrapper-text")}>한 줄 소개</h4>
          <input
            type="text"
            placeholder="본인을 한 줄로 소개해보세요."
            onChange={(e) => changeBioHandler(e)}
          />
        </div>
      </div>
      <div className={cx("local-auth-bottom")}>
        <button
          className={cx("local-auth-bottom-submit")}
          onClick={() => submitUserHandler()}
        >
          <FiArrowRight className={cx("local-auth-bottom-submit-icon")} />
        </button>
      </div>
    </div>
  );
};

export default LocalAuth;
