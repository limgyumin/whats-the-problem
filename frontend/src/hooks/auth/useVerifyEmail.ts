import { useMutation } from "@apollo/client";
import { createUserState } from "atom/auth.atom";
import { verifyCodeRegExp } from "constants/regExp/verifyCodeRegExp";
import { VERIFY_MAILER } from "graphql/mailer/mailer.mutation";
import { isInvalidString } from "lib/isInvalidString";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { IVerifyMailerResult } from "types/mailer/mailer.type";
import { ICreateUser } from "types/user/user.type";

const useVerifyEmail = () => {
  const history = useHistory();
  const [verifyMailer] = useMutation<IVerifyMailerResult>(VERIFY_MAILER);

  const user = useRecoilValue<ICreateUser>(createUserState);
  const [verifyCode, setVerifyCode] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  const changeVerifyCodeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setVerifyCode(value);
    },
    [setVerifyCode]
  );

  const validate = useCallback((): boolean => {
    if (isInvalidString(verifyCode, verifyCodeRegExp)) {
      setWarning(
        "인증코드는 5자리의 영문 대문자 또는 숫자로 이루어져야합니다."
      );
      return false;
    }

    setWarning("");
    return true;
  }, [verifyCode]);

  const submitVerifyCodeHandler = useCallback(async (): Promise<void> => {
    const { email } = user;

    if (!validate()) return;

    try {
      const { data } = await verifyMailer({ variables: { email, verifyCode } });

      if (data) {
        history.push("/signup/auth");
      }
    } catch (error) {
      switch (error.message) {
        case "Invalid email or verify code.":
          setWarning("유효하지 않은 인증코드입니다.");
          break;
        case "Expired email.":
          setWarning("이미 만료된 인증코드입니다.");
          break;
        default:
          history.push("/");
      }
    }
  }, [user, verifyCode, history, verifyMailer, validate]);

  useEffect(() => {
    if (!user.email) {
      history.push("/");
    }
    return () => {
      setVerifyCode("");
      setWarning("");
    };
  }, [history, user, setVerifyCode, setWarning]);

  return {
    warning,
    verifyCode,
    changeVerifyCodeHandler,
    submitVerifyCodeHandler,
  };
};

export default useVerifyEmail;
