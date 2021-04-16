import gql from "graphql-tag";

export const CREATE_MAILER = gql`
  mutation createMailer($email: String!) {
    createMailer(email: $email) {
      idx
      email
      verifyCode
      expiredAt
      isVerified
    }
  }
`;

export const VERIFY_MAILER = gql`
  mutation verifyMailer($email: String!, $verifyCode: String!) {
    verifyMailer(email: $email, verifyCode: $verifyCode) {
      idx
      email
      verifyCode
      expiredAt
      isVerified
    }
  }
`;
