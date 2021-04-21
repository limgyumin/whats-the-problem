import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import useFetchMyProfile from "hooks/user/useFetchMyProfile";
import HeaderProfile from "./HeaderProfile";
import HeaderAction from "./HeaderAction";

const styles = require("./Header.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Header = () => {
  const { login, result, profile } = useFetchMyProfile();
  const { loading } = result;

  return (
    <header className={cx("header")}>
      <div className={cx("header-wrapper")}>
        <Logo className={cx("header-wrapper-logo")} />
        {!loading && (
          <React.Fragment>
            {login && profile ? (
              <HeaderProfile profile={profile} />
            ) : (
              <HeaderAction />
            )}
          </React.Fragment>
        )}
      </div>
    </header>
  );
};

export default Header;
