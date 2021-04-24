import { CREATE_MAILER } from "graphql/mailer/mailer.mutation";
import { useCallback, useEffect, useState } from "react";
import { ICreateMailerResult } from "types/mailer/mailer.type";
import { useHistory } from "react-router";
import { isInvalidString } from "lib/isInvalidString";
import { emailRegExp } from "constants/regExp/emailRegExp";
import { useRecoilState } from "recoil";
import { createUserState } from "atom/auth.atom";
import { useMutation } from "@apollo/client";
import { ICreateUser } from "types/user/user.type";
import { useToasts } from "react-toast-notifications";

const useEmailAuth = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const [createMailer] = useMutation<ICreateMailerResult>(CREATE_MAILER);

  const [user, setUser] = useRecoilState<ICreateUser>(createUserState);
  const [loading, setLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");

  const changeEmailHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setUser({ ...user, email: value });
    },
    [user, setUser]
  );

  const validate = useCallback((): boolean => {
    const { email } = user;

    if (isInvalidString(email, emailRegExp)) {
      setWarning("올바른 이메일 형식이 아닙니다.");
      return false;
    }

    setWarning("");
    return true;
  }, [user]);

  const submitEmailHandler = useCallback(async (): Promise<void> => {
    const { email } = user;

    if (!validate()) return;
    setLoading(true);

    try {
      const { data } = await createMailer({ variables: { email } });

      if (data) {
        setLoading(false);
        history.push("/signup/verify");
      }
    } catch (error) {
      if (error.message.includes("Email already verified.")) {
        setWarning("이미 존재하는 이메일입니다.");
      } else {
        addToast("사용자 정보를 제출하는 중에 오류가 발생했어요...", {
          appearance: "error",
        });
        history.push("/");
      }
      setLoading(false);
    }
  }, [user, history, validate, createMailer, setLoading, addToast]);

  useEffect(() => {
    return () => {
      setWarning("");
      setLoading(false);
    };
  }, [setWarning, setLoading]);

  return {
    loading,
    warning,
    user,
    changeEmailHandler,
    submitEmailHandler,
  };
};

export default useEmailAuth;
