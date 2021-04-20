import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import profile from "assets/images/profile.svg";
import { FiArrowRight } from "react-icons/fi";
import useRegister from "hooks/auth/useRegister";
import { isEmpty } from "lib/isEmpty";
import { IoMdLock } from "react-icons/io";
import Input from "components/common/Input";

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
  } = useRegister();
  const { email, password, name, bio } = user;

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
              value={email}
              className={cx("local-auth-inputs-wrapper-input-element")}
              readOnly={!isEmpty(email)}
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
        <Input
          name="비밀번호"
          value={password}
          type="password"
          placeholder="비밀번호을 입력해주세요."
          onChangeHandler={changePasswordHandler}
          warning={passwordWarning}
        />
        <Input
          name="이름"
          value={name}
          placeholder="이름을 입력해주세요."
          maxLength={16}
          onChangeHandler={changeNameHandler}
          warning={nameWarning}
        />
        <Input
          name="한 줄 소개"
          value={bio}
          placeholder="본인을 한 줄로 소개해보세요."
          onChangeHandler={changeBioHandler}
        />
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
