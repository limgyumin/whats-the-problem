import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import HeaderProfile from "./HeaderProfile";
import HeaderAction from "./HeaderAction";
import { Link } from "react-router-dom";
import useHeader from "hooks/header/useHeader";
import useFetchMyProfile from "hooks/user/useFetchMyProfile";

const styles = require("./Header.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Header = () => {
  const { loading, login, profile } = useFetchMyProfile();
  const { show, showMenuHandler } = useHeader();

  return (
    <header className={cx("header")}>
      <div className={cx("header-wrapper")}>
        <Link to="/" className={cx("header-wrapper-logo")}>
          <Logo className={cx("header-wrapper-logo-image")} />
        </Link>
        {!loading && (
          <React.Fragment>
            {login && profile ? (
              <HeaderProfile
                profile={profile}
                show={show}
                showMenuHandler={showMenuHandler}
              />
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
