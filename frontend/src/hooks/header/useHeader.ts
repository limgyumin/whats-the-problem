import { useCallback, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState, myProfileState } from "atom/auth.atom";
import { showMenuState } from "atom/header.atom";
import { removeCookie } from "lib/cookie";
import { initialUserShortInfo } from "types/user/user.initial-state";
import { IUserShortInfo } from "types/user/user.type";
import useClose from "hooks/util/useClose";

const useHeader = () => {
  const [show, setShow] = useRecoilState<boolean>(showMenuState);

  const clickRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const setProfile = useSetRecoilState<IUserShortInfo>(myProfileState);
  const setLogin = useSetRecoilState<boolean>(loginState);

  const logoutHandler = useCallback(() => {
    removeCookie("token");
    setProfile(initialUserShortInfo);
    setLogin(false);
  }, [setProfile, setLogin]);

  const showMenuHandler = useCallback(() => {
    setShow(!show);
  }, [show, setShow]);

  useClose<HTMLDivElement>(clickRef, menuRef, showMenuHandler);

  return {
    clickRef,
    menuRef,
    show,
    showMenuHandler,
    logoutHandler,
  };
};

export default useHeader;
