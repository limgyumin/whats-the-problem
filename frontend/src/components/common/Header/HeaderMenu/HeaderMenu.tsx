import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import defaultProfile from "assets/images/profile.svg";
import useHeaderMenu from "hooks/header/useHeaderMenu";

const styles = require("./HeaderMenu.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HeaderMenuProps = {
  avatar: string;
  name: string;
  bio: string;
};

const HeaderMenu = ({ avatar, name, bio }: HeaderMenuProps) => {
  const { logoutHandler } = useHeaderMenu();

  return (
    <div className={cx("header-menu")}>
      <div className={cx("header-menu-profile")}>
        <img
          src={avatar || defaultProfile}
          alt="Profile"
          className={cx("header-menu-profile-avatar")}
        />
        <div className={cx("header-menu-profile-wrapper")}>
          <h3 className={cx("header-menu-profile-wrapper-name")}>{name}</h3>
          <p className={cx("header-menu-profile-wrapper-bio")}>{bio}</p>
        </div>
      </div>
      <div className={cx("header-menu-logout")} onClick={() => logoutHandler()}>
        <p className={cx("header-menu-logout-text")}>로그아웃</p>
      </div>
    </div>
  );
};

export default HeaderMenu;
