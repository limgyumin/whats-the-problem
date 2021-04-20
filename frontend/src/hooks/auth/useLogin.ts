import React, { useEffect } from "react";
import { ApolloError, useMutation } from "@apollo/client";
import { LOGIN } from "graphql/auth/auth.mutation";
import { useCallback, useState } from "react";
import { ILoginResult } from "types/user/user.result.type";
import { isInvalidString } from "lib/isInvalidString";
import { emailRegExp } from "constants/regExp/emailRegExp";
import { passwordRegExp } from "constants/regExp/passwordRegExp";
import cookie from "js-cookie";
import { useHistory } from "react-router";

const useLogin = () => {
  const history = useHistory();
  const [login] = useMutation<ILoginResult>(LOGIN);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailWarning, setEmailWarning] = useState<string>("");
  const [passwordWarning, setPasswordWarning] = useState<string>("");

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

    if (invalidEmail) {
      setEmailWarning("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailWarning("");
    }

    if (invalidPassword) {
      setPasswordWarning(
        "비밀번호는 6 ~ 20자 이내의 영문 대소문자와 최소 1개 이상의 숫자 또는 특수문자를 포함해야 합니다."
      );
    } else {
      setPasswordWarning("");
    }

    return !(invalidEmail || invalidPassword);
  }, [email, password]);

  const submitUserHandler = useCallback(async (): Promise<void> => {
    if (!validate()) return;

    await login({ variables: { email, password } })
      .then((res) => {
        if (res.data) {
          cookie.set("token", res.data.login);
          history.push("/");
        }
      })
      .catch((err: ApolloError) => {
        history.push("/");
      });
  }, [email, password, history, validate, login]);

  useEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
      setEmailWarning("");
      setPasswordWarning("");
    };
  }, []);

  return {
    email,
    password,
    emailWarning,
    passwordWarning,
    changeEmailHandler,
    changePasswordHandler,
    submitUserHandler,
  };
};

export default useLogin;
