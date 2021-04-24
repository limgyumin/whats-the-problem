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

const useGitHubAuth = () => {
  const code: string = useQueryString("code");
  const history = useHistory();
  const { addToast } = useToasts();

  const [gitHubUser] = useMutation<IGitHubUserResult>(GITHUB_USER);
  const [gitHubAuth] = useMutation<IGitHubAuthResult>(GITHUB_AUTH);

  const [user, setUser] = useRecoilState<IGitHubUser>(gitHubUserState);
  const [warning, setWarning] = useState<string>("");
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

  const gitHubUserHandler = useCallback(async (): Promise<void> => {
    setLoading(true);

    const { data, errors } = await gitHubUser({ variables: { code } });

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

    if (errors) {
      addToast("GitHub 사용자 정보를 조회하는 중에 오류가 발생했어요...", {
        appearance: "error",
      });
      history.push("/");
    }
  }, [code, history, gitHubUser, setUser, setLoading, addToast]);

  const validate = useCallback((): boolean => {
    const { name } = user;

    if (isInvalidString(name, nameRegExp)) {
      setWarning(
        "이름은 2 ~ 16자 이내의 한글, 영어, 또는 숫자로 이루어져야합니다."
      );
      return false;
    }

    setWarning("");
    return true;
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
      addToast("GitHub 사용자 정보를 제출하는 중에 오류가 발생했어요...", {
        appearance: "error",
      });
      history.push("/");
    }
  }, [user, history, validate, gitHubAuth, addToast]);

  useEffect(() => {
    gitHubUserHandler();

    return () => {
      setWarning("");
      setLoading(false);
    };
  }, [gitHubUserHandler]);

  return {
    loading,
    warning,
    user,
    changeNameHandler,
    changeBioHandler,
    submitUserHandler,
  };
};

export default useGitHubAuth;
