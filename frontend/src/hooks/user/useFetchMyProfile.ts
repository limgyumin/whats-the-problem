import { useRecoilState } from "recoil";
import { loginState, myProfileState } from "atom/auth.atom";
import { getToken } from "lib/token";
import { MY_PROFILE } from "graphql/user/user.query";
import { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router";
import { useLazyQuery } from "@apollo/client";
import { IMyProfileResult } from "types/user/user.result.type";
import { IUserShortInfo } from "types/user/user.type";

const useFetchMyProfile = () => {
  const [fetchMyProfile, { loading, data, error }] = useLazyQuery<
    IMyProfileResult
  >(MY_PROFILE, { fetchPolicy: "no-cache" });

  const history = useHistory();

  const [profile, setProfile] = useRecoilState<IUserShortInfo>(myProfileState);
  const [login, setLogin] = useRecoilState<boolean>(loginState);

  const token = useMemo(() => getToken(), []);

  const fetchResultHandler = useCallback((): void => {
    if (!loading && data) {
      setProfile(data.me);
      setLogin(true);
    }

    if (error) {
      history.push("/");
    }
  }, [history, loading, data, error, setLogin, setProfile]);

  useEffect(() => {
    if (!login && token) {
      fetchMyProfile();
    }
  }, [token, login, fetchMyProfile]);

  useEffect(() => {
    fetchResultHandler();
  }, [fetchResultHandler]);

  return {
    token,
    login,
    loading,
    profile,
  };
};

export default useFetchMyProfile;
