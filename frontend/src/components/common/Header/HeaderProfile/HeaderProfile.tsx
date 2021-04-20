import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { IUserShortInfo } from "types/user.type";
import defaultProfile from "assets/images/profile.svg";

const styles = require("./HeaderProfile.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HeaderProfileProps = {
  profile: IUserShortInfo;
};

const HeaderProfile = ({ profile }: HeaderProfileProps) => {
  const { avatar } = profile;

  return (
    <div className={cx("header-profile")}>
      <img
        className={cx("header-profile-avatar")}
        src={avatar || defaultProfile}
        alt="Profile"
      />
    </div>
  );
};

export default HeaderProfile;
