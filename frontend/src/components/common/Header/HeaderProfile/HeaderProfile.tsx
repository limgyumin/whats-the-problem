import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { IUserShortInfo } from "types/user/user.type";
import defaultProfile from "assets/images/profile.svg";
import { GoTriangleDown } from "react-icons/go";
import HeaderMenu from "../HeaderMenu";
import { Link } from "react-router-dom";

const styles = require("./HeaderProfile.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HeaderProfileProps = {
  profile: IUserShortInfo;
  show: boolean;
  showMenuHandler: (state: boolean) => void;
};

const HeaderProfile: React.FC<HeaderProfileProps> = ({
  profile,
  show,
  showMenuHandler,
}) => {
  const { avatar, name, bio } = profile;

  return (
    <div className={cx("header-profile")}>
      <Link to="/write" className={cx("header-profile-write")}>
        <p className={cx("header-profile-write-text")}>글 쓰기</p>
      </Link>
      <div
        className={cx("header-profile-wrapper")}
        onClick={() => showMenuHandler(true)}
      >
        <img
          className={cx("header-profile-wrapper-avatar")}
          src={avatar || defaultProfile}
          alt="Profile"
        />
        <GoTriangleDown className={cx("header-profile-wrapper-arrow")} />
        {show && <HeaderMenu avatar={avatar} name={name} bio={bio} />}
      </div>
    </div>
  );
};

export default HeaderProfile;
