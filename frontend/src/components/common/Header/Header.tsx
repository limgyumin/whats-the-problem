import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import { Link } from "react-router-dom";
import useFetchProfile from "hooks/user/useFetchProfile";
import HeaderProfile from "./HeaderProfile";

const styles = require("./Header.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Header = () => {
  const { login, result } = useFetchProfile();

  const { loading, data } = result;

  return (
    <header className={cx("header")}>
      <div className={cx("header-wrapper")}>
        <Logo className={cx("header-wrapper-logo")} />
        {!loading && (
          <React.Fragment>
            {login && data ? (
              <HeaderProfile profile={data.me} />
            ) : (
              <div className={cx("header-wrapper-actions")}>
                <Link
                  to="/signin"
                  className={cx("header-wrapper-actions-signin")}
                >
                  <p className={cx("header-wrapper-actions-signin-text")}>
                    Sign in
                  </p>
                </Link>
                <Link
                  to="/signup"
                  className={cx("header-wrapper-actions-signup")}
                >
                  <p className={cx("header-wrapper-actions-signup-text")}>
                    Sign up
                  </p>
                </Link>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </header>
  );
};

export default Header;
