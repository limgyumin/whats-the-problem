import React from "react";
import ReactDOM from "react-dom";
import "styles/util.scss";
import { ApolloProvider } from "@apollo/client";
import App from "components/App";
import { client } from "./client/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
