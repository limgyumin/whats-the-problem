import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { SERVER } from "config/config.json";
import { getToken } from "lib/getToken";

const httpLink = createHttpLink({
  uri: SERVER,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
