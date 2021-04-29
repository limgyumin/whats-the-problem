import { gitHubUserState } from "atom/auth.atom";
import { GITHUB_AUTH, GITHUB_USER } from "graphql/auth/auth.mutation";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import cookie from "js-cookie";
import { IGitHubUser } from "types/user/user.type";
import { isInvalidString } from "lib/isInvalidString";
import useQueryString from "hooks/util/useQueryString";
import { nameRegExp } from "constants/regExp/nameRegExp";
import { useMutation } from "@apollo/client";
import { createToken } from "lib/token";
import {
  IGitHubAuthResult,
  IGitHubUserResult,
} from "types/user/user.result.type";
import { setCookie } from "lib/cookie";
import { useToasts } from "react-toast-notifications";
import React from "react";
import { idRegExp } from "constants/regExp/idRegExp";

const useGitHubAuth = () => {
  const code: string = useQueryString("code");
  const history = useHistory();
  const { addToast } = useToasts();

  const [gitHubUser] = useMutation<IGitHubUserResult>(GITHUB_USER);
  const [gitHubAuth] = useMutation<IGitHubAuthResult>(GITHUB_AUTH);

  const [user, setUser] = useRecoilState<IGitHubUser>(gitHubUserState);
  const [idWarning, setIdWarning] = useState<string>("");
  const [nameWarning, setNameWarning] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  const changeIdHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setUser({ ...user, id: value });
    },
    [user, setUser]
  );

  const gitHubUserHandler = useCallback(async (): Promise<void> => {
    setLoading(true);

    try {
      const { data } = await gitHubUser({ variables: { code } });

      if (data) {
        const gitHubUser: IGitHubUser = data.gitHubUser;

        if (!gitHubUser.isNew) {
          cookie.set("token", createToken(gitHubUser));
          setLoading(false);
          addToast(
            "성공적으로 로그인 되었어요. 이제 What'sTheProblem과 함께해봅시다!",
            { appearance: "success" }
          );
          history.push("/");
        }

        delete gitHubUser.isNew;

        setUser(gitHubUser);
        setLoading(false);
      }
    } catch (error) {
      history.push("/");
    }
  }, [code, history, gitHubUser, setUser, setLoading, addToast]);

  const validate = useCallback((): boolean => {
    const { name, id } = user;

    const [invalidName, invalidId] = [
      isInvalidString(name, nameRegExp),
      isInvalidString(id, idRegExp),
    ];

    if (invalidName) {
      setNameWarning(
        "이름은 2 ~ 16자 이내의 한글, 영어, 또는 숫자로 이루어져야합니다."
      );
    } else {
      setNameWarning("");
    }

    if (invalidId) {
      setIdWarning(
        "아이디는 4 ~ 30자 이내의 영어, 또는 숫자로 이루어져야합니다."
      );
    } else {
      setIdWarning("");
    }

    return !(invalidId || invalidName);
  }, [user]);

  const submitUserHandler = useCallback(async (): Promise<void> => {
    if (!validate()) return;

    try {
      const { data } = await gitHubAuth({ variables: { user } });

      if (data) {
        setCookie("token", data.gitHubAuth);
        addToast(
          "성공적으로 로그인 되었어요. 이제 What'sTheProblem과 함께해봅시다!",
          { appearance: "success" }
        );
        history.push("/");
      }
    } catch (error) {
      if (error.message.includes("User already exist.")) {
        setIdWarning("이미 존재하는 아이디입니다.");
      } else {
        addToast("GitHub 사용자 정보를 제출하는 중에 오류가 발생했어요...", {
          appearance: "error",
        });
        history.push("/");
      }
    }
  }, [user, history, validate, gitHubAuth, addToast]);

  useEffect(() => {
    gitHubUserHandler();

    return () => {
      setNameWarning("");
      setLoading(false);
    };
  }, [gitHubUserHandler]);

  return {
    loading,
    nameWarning,
    idWarning,
    user,
    changeNameHandler,
    changeIdHandler,
    changeBioHandler,
    submitUserHandler,
  };
};

export default useGitHubAuth;
