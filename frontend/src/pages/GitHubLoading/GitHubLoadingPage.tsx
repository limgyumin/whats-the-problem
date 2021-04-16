import React from "react";
import GitHubLoading from "components/Auth/GitHubLoading";
import AuthTemplate from "components/Templates/AuthTemplate";

const GitHubLoadingPage = () => {
  return (
    <AuthTemplate>
      <GitHubLoading />
    </AuthTemplate>
  );
};

export default GitHubLoadingPage;
