import gql from "graphql-tag";

export const MY_PROFILE = gql`
  query me {
    me {
      avatar
      name
      bio
    }
  }
`;
