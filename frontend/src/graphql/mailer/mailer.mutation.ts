import { gql } from "@apollo/client";

export const CREATE_MAILER = gql`
  mutation createMailer($email: String!) {
    createMailer(email: $email) {
      email
      expiredAt
    }
  }
`;

export const VERIFY_MAILER = gql`
  mutation verifyMailer($email: String!, $verifyCode: String!) {
    verifyMailer(email: $email, verifyCode: $verifyCode) {
      email
      expiredAt
    }
  }
`;
