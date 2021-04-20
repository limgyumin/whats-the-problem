import { useRecoilState } from "recoil";
import { loginState } from "atom/auth.atom";
import { getToken } from "lib/token";
import { MY_PROFILE } from "graphql/user/user.query";
import { useCallback, useEffect } from "react";
import { useHistory } from "react-router";
import { useLazyQuery } from "@apollo/client";
import { IMyProfileResult } from "types/user/user.result.type";

const useFetchProfile = () => {
  const history = useHistory();
  const [fetchMyProfile, result] = useLazyQuery<IMyProfileResult>(MY_PROFILE);

  const [login, setLogin] = useRecoilState(loginState);

  const fetchMyProfileHandler = useCallback((): void => {
    const token = getToken();
    const { error } = result;

    if (!login && token) {
      fetchMyProfile();
      setLogin(true);
    }

    if (error) {
      history.push("/");
    }
  }, [login, result, history, setLogin, fetchMyProfile]);

  useEffect(() => {
    fetchMyProfileHandler();
  }, [fetchMyProfileHandler]);

  return {
    login,
    result,
  };
};

export default useFetchProfile;
