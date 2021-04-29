import React from "react";
import { Redirect, Route } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import useFetchMyProfile from "hooks/user/useFetchMyProfile";

type RestrictRouteProps = {
  exact?: boolean | false;
  path: string;
  render: (props?: RouteComponentProps) => React.ReactNode;
};

const RestrictRoute: React.FC<RestrictRouteProps> = ({
  exact,
  path,
  render,
}) => {
  const { token } = useFetchMyProfile();

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (token ? render() : <Redirect to="/" />)}
    />
  );
};

export default RestrictRoute;
