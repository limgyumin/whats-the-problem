import { createUserState } from "atom/auth.atom";
import { REGISTER } from "graphql/auth/auth.mutation";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import { isInvalidString } from "lib/isInvalidString";
import { passwordRegExp } from "constants/regExp/passwordRegExp";
import { nameRegExp } from "constants/regExp/nameRegExp";
import { IRegisterResult } from "types/user/user.result.type";
import { useMutation } from "@apollo/client";
import { setCookie } from "lib/cookie";
import { useToasts } from "react-toast-notifications";
import { ICreateUser } from "types/user/user.type";

const useRegister = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const [register] = useMutation<IRegisterResult>(REGISTER);

  const [user, setUser] = useRecoilState<ICreateUser>(createUserState);
  const [passwordWarning, setPasswordWarning] = useState<string>("");
  const [nameWarning, setNameWarning] = useState<string>("");

  const changePasswordHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setUser({ ...user, password: value });
    },
    [user, setUser]
  );

  const changeNameHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setUser({ ...user, name: value });
    },
    [user, setUser]
  );

  const changeBioHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setUser({ ...user, bio: value });
    },
    [user, setUser]
  );

  const validate = useCallback((): boolean => {
    const { password, name } = user;

    const [invalidPassword, invalidName] = [
      isInvalidString(password, passwordRegExp),
      isInvalidString(name, nameRegExp),
    ];

    if (invalidPassword) {
      setPasswordWarning(
        "비밀번호는 6 ~ 20자 이내의 영문 대소문자와 최소 1개 이상의 숫자 또는 특수문자를 포함해야 합니다."
      );
    } else {
      setPasswordWarning("");
    }

    if (invalidName) {
      setNameWarning(
        "이름은 2 ~ 16자 이내의 한글, 영어, 또는 숫자로 이루어져야합니다."
      );
    } else {
      setNameWarning("");
    }

    return !(invalidPassword || invalidName);
  }, [user]);

  const submitUserHandler = useCallback(async (): Promise<void> => {
    if (!validate()) return;

    try {
      const { data } = await register({ variables: { user } });

      if (data) {
        setCookie("token", data.register);
        addToast(
          "성공적으로 회원가입 되었어요. 이제 What'sTheProblem과 함께해봅시다!",
          { appearance: "success" }
        );
        history.push("/");
      }
    } catch (error) {
      addToast("사용자 정보를 제출하는 중에 오류가 발생했어요...", {
        appearance: "error",
      });
      history.push("/");
    }
  }, [history, user, validate, register, addToast]);

  useEffect(() => {
    if (!user.email) {
      history.push("/");
    }
    return () => {
      setNameWarning("");
      setPasswordWarning("");
    };
  }, [user, history]);

  return {
    user,
    passwordWarning,
    nameWarning,
    changePasswordHandler,
    changeNameHandler,
    changeBioHandler,
    submitUserHandler,
  };
};

export default useRegister;
