import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useVerifyEmail from "hooks/auth/useVerifyEmail";
import { FiArrowRight } from "react-icons/fi";
import Input from "components/common/Input";

const styles = require("./VerifyEmail.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const VerifyEmail = () => {
  const {
    warning,
    verifyCode,
    changeVerifyCodeHandler,
    submitVerifyCodeHandler,
  } = useVerifyEmail();

  return (
    <div className={cx("verify-email")}>
      <div className={cx("verify-email-text")}>
        <h1 className={cx("verify-email-text-title")}>인증코드 확인하기</h1>
        <p className={cx("verify-email-text-subtitle")}>
          본인의 이메일로 인증코드를 전송했어요! 인증코드를 아래의 칸에
          입력해주세요.
        </p>
      </div>
      <div className={cx("verify-email-input")}>
        <Input
          name="인증코드"
          value={verifyCode}
          placeholder="5자리 인증코드를 입력해주세요."
          onChangeHandler={changeVerifyCodeHandler}
          warning={warning}
        />
      </div>
      <div className={cx("verify-email-bottom")}>
        <button
          className={cx("verify-email-bottom-submit")}
          onClick={() => submitVerifyCodeHandler()}
        >
          <FiArrowRight className={cx("verify-email-bottom-submit-icon")} />
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
