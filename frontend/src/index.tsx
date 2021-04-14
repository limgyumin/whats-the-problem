import React from "react";
import ReactDOM from "react-dom";
import "styles/util.scss";
import { ApolloProvider } from "react-apollo";
import App from "./components/App";
import { client } from "./client/client";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
