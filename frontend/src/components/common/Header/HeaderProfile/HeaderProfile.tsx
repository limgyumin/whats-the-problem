import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { IUserShortInfo } from "types/user/user.type";
import defaultProfile from "assets/images/profile.svg";
import { GoTriangleDown } from "react-icons/go";
import HeaderMenu from "../HeaderMenu";
import { Link } from "react-router-dom";
import useHeader from "hooks/header/useHeader";

const styles = require("./HeaderProfile.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HeaderProfileProps = {
  profile: IUserShortInfo;
};

const HeaderProfile: React.FC<HeaderProfileProps> = ({ profile }) => {
  const { clickRef, menuRef, show, showMenuHandler } = useHeader();
  const { avatar, name, bio } = profile;

  return (
    <div className={cx("header-profile")}>
      <Link to="/write" className={cx("header-profile-write")}>
        <p className={cx("header-profile-write-text")}>글 쓰기</p>
      </Link>
      {profile && (
        <div
          ref={clickRef}
          className={cx("header-profile-wrapper")}
          onClick={() => showMenuHandler()}
        >
          <img
            className={cx("header-profile-wrapper-avatar")}
            src={avatar || defaultProfile}
            alt="Profile"
          />
          <GoTriangleDown className={cx("header-profile-wrapper-arrow")} />
          {show && (
            <HeaderMenu
              menuRef={menuRef}
              avatar={avatar}
              name={name}
              bio={bio}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderProfile;
