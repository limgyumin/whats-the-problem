import { loginState, myProfileState } from "atom/auth.atom";
import { showMenuState } from "atom/header.atom";
import { removeCookie } from "lib/cookie";
import { useCallback, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { IUserShortInfo } from "types/user/user.type";

const useHeaderMenu = () => {
  const setProfile = useSetRecoilState<IUserShortInfo>(myProfileState);
  const setLogin = useSetRecoilState<boolean>(loginState);
  const setShow = useSetRecoilState<boolean>(showMenuState);

  const logoutHandler = useCallback(() => {
    removeCookie("token");
    setProfile({} as IUserShortInfo);
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
