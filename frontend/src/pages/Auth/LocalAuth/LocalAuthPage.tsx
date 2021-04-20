import LocalAuth from "components/Auth/LocalAuth";
import AuthTemplate from "components/Templates/AuthTemplate";
import React from "react";

const LocalAuthPage = () => {
  return (
    <AuthTemplate>
      <LocalAuth />
    </AuthTemplate>
  );
};

export default LocalAuthPage;
