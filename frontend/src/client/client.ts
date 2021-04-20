import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SERVER } from "config/config.json";
import { getToken } from "lib/token";

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
});
