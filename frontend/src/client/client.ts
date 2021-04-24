import {
  ApolloClient,
  ApolloLink,
  concat,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SERVER } from "config/config.json";
import { getToken } from "lib/token";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const httpLink = new HttpLink({
  uri: SERVER,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

const authMiddleWare = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  link: concat(authMiddleWare, httpLink),
  defaultOptions: defaultOptions,
});
