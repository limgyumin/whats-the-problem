import React from "react";
import ReactDOM from "react-dom";
import "styles/util.scss";
import { ApolloProvider } from "@apollo/client";
import App from "components/App";
import { client } from "./client/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ToastProvider autoDismiss={true} placement="top-center">
          <App />
        </ToastProvider>
      </ApolloProvider>
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById("root")
);
