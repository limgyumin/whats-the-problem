import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "graphql/auth/auth.mutation";
import { useCallback, useState } from "react";
import { ILoginResult } from "types/user/user.result.type";
import { isInvalidString } from "lib/isInvalidString";
import { emailRegExp } from "constants/regExp/emailRegExp";
import { passwordRegExp } from "constants/regExp/passwordRegExp";
import { useHistory } from "react-router";
import { setCookie } from "lib/cookie";
import { useToasts } from "react-toast-notifications";

const useLogin = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const [login] = useMutation<ILoginResult>(LOGIN);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setEmail(value);
  };

  const changePasswordHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setPassword(value);
  };

  const validate = useCallback((): boolean => {
    const [invalidEmail, invalidPassword] = [
      isInvalidString(email, emailRegExp),
      isInvalidString(password, passwordRegExp),
    ];

    if (invalidEmail || invalidPassword) {
      setWarning("이메일 또는 비밀번호가 일치하지 않습니다.");
    } else {
      setWarning("");
    }

    return !(invalidEmail || invalidPassword);
  }, [email, password]);

  const submitUserHandler = useCallback(async (): Promise<void> => {
    if (!validate()) return;

    try {
      const { data } = await login({ variables: { email, password } });

      if (data) {
        setCookie("token", data.login);
        addToast(
          "성공적으로 로그인 되었어요. 이제 What'sTheProblem과 함께해봅시다!",
          { appearance: "success" }
        );
        history.push("/");
      }
    } catch (error) {
      if (error.message.includes("User not found")) {
        setWarning("이메일 또는 비밀번호가 일치하지 않습니다.");
      } else {
        addToast("로그인을 처리하는 중에 오류가 발생했어요...", {
          appearance: "error",
        });
        history.push("/");
      }
    }
  }, [email, password, history, validate, addToast, login, setWarning]);

  useEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
      setWarning("");
    };
  }, []);

  return {
    email,
    password,
    warning,
    changeEmailHandler,
    changePasswordHandler,
    submitUserHandler,
  };
};

export default useLogin;
