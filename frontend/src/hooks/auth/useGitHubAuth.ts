import { gitHubUserState } from "atom/auth.atom";
import { GITHUB_AUTH, GITHUB_USER } from "graphql/auth/auth.mutation";
import { useCallback, useEffect, useState } from "react";
import { ExecutionResult, useMutation } from "react-apollo";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import cookie from "js-cookie";
import {
  IGitHubAuthResponse,
  IGitHubUser,
  IGitHubUserResponse,
} from "types/user.type";
import { isEmpty } from "lib/isEmpty";
import { isInvalidString } from "lib/isInvalidString";
import useQueryString from "hooks/util/useQueryString";
import { ApolloError } from "apollo-client";
import { nameRegExp } from "constants/regExp/nameRegExp";

const useGitHubAuth = () => {
  const code = useQueryString("code");
  const history = useHistory();

  const [gitHubUser] = useMutation(GITHUB_USER);
  const [gitHubAuth] = useMutation(GITHUB_AUTH);

  const [user, setUser] = useRecoilState<IGitHubUser>(gitHubUserState);
  const [warning, setWarning] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const changeNameHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setUser({
        ...user,
        name: value,
      });
    },
    [user, setUser]
  );

  const changeBioHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setUser({
        ...user,
        bio: value,
      });
    },
    [user, setUser]
  );

  const gitHubUserHandler = useCallback(async () => {
    setLoading(true);
    await gitHubUser({
      variables: { code },
    })
      .then((res: ExecutionResult<IGitHubUserResponse>) => {
        if (res.data) {
          setUser(res.data.gitHubUser);
          setLoading(false);
        }
      })
      .catch((err: ApolloError) => {
        history.push("/");
      });
  }, [code, history, gitHubUser, setUser, setLoading]);

  const submitUserHandler = useCallback(async () => {
    const { name } = user;

    if (isEmpty(name) || isInvalidString(name, nameRegExp)) {
      setWarning(
        "이름은 2 ~ 16자 이내의 한글, 영어, 또는 숫자로 이루어져야합니다."
      );
      return;
    }

    await gitHubAuth({
      variables: { user },
    })
      .then((res: ExecutionResult<IGitHubAuthResponse>) => {
        if (res.data) {
          cookie.set("token", res.data.gitHubAuth);
          history.push("/");
        }
      })
      .catch((err: ApolloError) => {
        history.push("/");
      });
  }, [user, history, gitHubAuth, setWarning]);

  useEffect(() => {
    gitHubUserHandler();
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
