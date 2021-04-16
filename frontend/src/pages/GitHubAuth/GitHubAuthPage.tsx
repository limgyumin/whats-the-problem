import React from "react";
import GitHubAuth from "components/Auth/GitHubAuth";
import AuthTemplate from "components/Templates/AuthTemplate";

const GitHubAuthPage = () => {
  return (
    <AuthTemplate>
      <GitHubAuth />
    </AuthTemplate>
  );
};

export default GitHubAuthPage;
