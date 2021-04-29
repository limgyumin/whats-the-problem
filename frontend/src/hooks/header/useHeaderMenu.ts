import { loginState, myProfileState } from "atom/auth.atom";
import { showMenuState } from "atom/header.atom";
import { removeCookie } from "lib/cookie";
import { useCallback, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { initialUserShortInfo } from "types/user/user.initial-state";
import { IUserShortInfo } from "types/user/user.type";

const useHeaderMenu = () => {
  const setProfile = useSetRecoilState<IUserShortInfo>(myProfileState);
  const setLogin = useSetRecoilState<boolean>(loginState);
  const setShow = useSetRecoilState<boolean>(showMenuState);

  const logoutHandler = useCallback(() => {
    removeCookie("token");
    setProfile(initialUserShortInfo);
    setLogin(false);
  }, [setProfile, setLogin]);

  const closeMenuHandler = () => {
    setShow(false);
  };

  useEffect(() => {
    document.addEventListener("click", closeMenuHandler);
    return () => document.removeEventListener("click", closeMenuHandler);
  });

  return {
    logoutHandler,
  };
};

export default useHeaderMenu;
