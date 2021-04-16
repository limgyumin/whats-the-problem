import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const REGISTER = gql`
  mutation register($user: CreateUserInput!) {
    register(user: $user)
  }
`;

export const GITHUB_USER = gql`
  mutation gitHubUser($code: String!) {
    gitHubUser(code: $code) {
      avatar
      email
      gitHubId
      name
      bio
    }
  }
`;

export const GITHUB_AUTH = gql`
  mutation gitHubAuth($user: GitHubUserInput!) {
    gitHubAuth(user: $user)
  }
`;
