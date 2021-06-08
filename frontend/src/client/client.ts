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

const httpLink = new HttpLink({
  uri: `${SERVER}/graphql`,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

const cache = new InMemoryCache();

const authMiddleWare = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return forward(operation);
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  },
};

export const client = new ApolloClient({
  link: concat(authMiddleWare, httpLink),
  cache,
  defaultOptions,
});
