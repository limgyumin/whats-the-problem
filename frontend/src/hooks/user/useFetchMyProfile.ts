import { useRecoilState } from "recoil";
import { loginState, myProfileState } from "atom/auth.atom";
import { getToken } from "lib/token";
import { MY_PROFILE } from "graphql/user/user.query";
import { useCallback, useEffect } from "react";
import { useHistory } from "react-router";
import { useLazyQuery } from "@apollo/client";
import { IMyProfileResult } from "types/user/user.result.type";
import { useToasts } from "react-toast-notifications";
import { IUserShortInfo } from "types/user/user.type";

const useFetchMyProfile = () => {
  const { addToast } = useToasts();
  const [fetchMyProfile, { loading, data, error }] = useLazyQuery<
    IMyProfileResult
  >(MY_PROFILE);

  const history = useHistory();

  const [profile, setProfile] = useRecoilState<IUserShortInfo>(myProfileState);
  const [login, setLogin] = useRecoilState<boolean>(loginState);

  const fetchResultHandler = useCallback((): void => {
    if (!loading && data) {
      setProfile(data.me);
      setLogin(true);
    }

    if (error) {
      addToast("질문 목록을 조회하는 중에 알 수 없는 오류가 발생했어요...", {
        appearance: "error",
      });
      history.push("/");
    }
  }, [history, loading, data, error, setLogin, setProfile, addToast]);

  useEffect(() => {
    const token = getToken();
    if (!login && token) {
      fetchMyProfile();
    }
  }, [login, fetchMyProfile]);

  useEffect(() => {
    fetchResultHandler();
  }, [fetchResultHandler]);

  return {
    login,
    loading,
    profile,
  };
};

export default useFetchMyProfile;
