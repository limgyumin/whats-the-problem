import { useRecoilState } from "recoil";
import { loginState, myProfileState } from "atom/auth.atom";
import { getToken } from "lib/token";
import { MY_PROFILE } from "graphql/user/user.query";
import { useCallback, useEffect } from "react";
import { useHistory } from "react-router";
import { useLazyQuery } from "@apollo/client";
import { IMyProfileResult } from "types/user/user.result.type";
import { IUserShortInfo } from "types/user/user.type";

const useFetchMyProfile = () => {
  const history = useHistory();
  const [fetchMyProfile, result] = useLazyQuery<IMyProfileResult>(MY_PROFILE, {
    fetchPolicy: "no-cache",
  });

  const [login, setLogin] = useRecoilState<boolean>(loginState);
  const [profile, setProfile] = useRecoilState<IUserShortInfo>(myProfileState);

  const fetchMyProfileHandler = useCallback((): void => {
    const token = getToken();
    const { error, loading, data } = result;

    if (!login && token) {
      fetchMyProfile();
      setLogin(true);
    }

    if (!loading && data) {
      setProfile(data.me);
    }

    if (error) {
      history.push("/");
    }
  }, [login, result, history, setLogin, setProfile, fetchMyProfile]);

  useEffect(() => {
    fetchMyProfileHandler();
  }, [fetchMyProfileHandler]);

  return {
    login,
    result,
    profile,
  };
};

export default useFetchMyProfile;
