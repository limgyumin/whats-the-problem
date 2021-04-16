import { gitHubUserState } from "atom/auth.atom";
import { GITHUB_AUTH, GITHUB_USER } from "graphql/auth/auth.mutation";
import useQueryString from "hooks/util/useQueryString";
import { useCallback, useState } from "react";
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
import { isInvalidLength } from "lib/isInvalidLength";

const useGitHubAuth = () => {
  const code = useQueryString("code");
  const history = useHistory();

  const [gitHubUser] = useMutation(GITHUB_USER);
  const [gitHubAuth] = useMutation(GITHUB_AUTH);

  const [request, setRequest] = useRecoilState<IGitHubUser>(gitHubUserState);
  const [warning, setWarning] = useState<string>("");

  const changeNameHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setRequest({
        ...request,
        name: value,
      });
    },
    [request, setRequest]
  );

  const changeBioHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setRequest({
        ...request,
        bio: value,
      });
    },
    [request, setRequest]
  );

  const gitHubUserHandler = useCallback(async () => {
    await gitHubUser({
      variables: { code },
    })
      .then((res: ExecutionResult<IGitHubUserResponse>) => {
        if (res.data) {
          setRequest(res.data.gitHubUser);
          history.push("/github/auth");
        }
      })
      .catch((err) => {
        history.push("/");
      });
  }, [code, history, gitHubUser, setRequest]);

  const gitHubAuthHandler = useCallback(async () => {
    try {
      await gitHubAuth({
        variables: { user: request },
      }).then((res: ExecutionResult<IGitHubAuthResponse>) => {
        if (res.data) {
          cookie.set("token", res.data.gitHubAuth);
          history.push("/");
        }
      });
    } catch (error) {
      history.push("/");
    }
  }, [request, history, gitHubAuth]);

  const submitButtonClickHandler = useCallback(async () => {
    const { name } = request;

    if (isEmpty(name) || isInvalidLength(name)) {
      setWarning(
        "이름은 2 ~ 16자 이내의 한글, 영어, 또는 숫자로 이루어져야합니다."
      );
      return;
    }

    await gitHubAuthHandler();
  }, [request, gitHubAuthHandler, setWarning]);

  return {
    warning,
    request,
    changeNameHandler,
    changeBioHandler,
    gitHubUserHandler,
    submitButtonClickHandler,
  };
};

export default useGitHubAuth;
