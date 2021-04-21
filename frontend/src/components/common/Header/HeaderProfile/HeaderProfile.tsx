import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { IUserShortInfo } from "types/user/user.type";
import defaultProfile from "assets/images/profile.svg";
import { GoTriangleDown } from "react-icons/go";
import HeaderMenu from "../HeaderMenu";
import useHeader from "hooks/header/useHeader";

const styles = require("./HeaderProfile.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HeaderProfileProps = {
  profile: IUserShortInfo;
};

const HeaderProfile = ({ profile }: HeaderProfileProps) => {
  const { show, showMenuHandler } = useHeader();
  const { avatar, name, bio } = profile;

  return (
    <div className={cx("header-profile")} onClick={() => showMenuHandler(true)}>
      <img
        className={cx("header-profile-avatar")}
        src={avatar || defaultProfile}
        alt="Profile"
      />
      <GoTriangleDown className={cx("header-profile-arrow")} />
      {show && <HeaderMenu avatar={avatar} name={name} bio={bio} />}
    </div>
  );
};

export default HeaderProfile;
