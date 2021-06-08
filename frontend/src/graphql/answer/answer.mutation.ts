import { gql } from "@apollo/client";

export const CREATE_ANSWER = gql`
  mutation createAnswer($questionIdx: Int!, $content: String!) {
    createAnswer(questionIdx: $questionIdx, content: $content) {
      idx
    }
  }
`;

export const UPDATE_ANSWER = gql`
  mutation updateAnswer($idx: Int!, $content: String!) {
    updateAnswer(idx: $idx, content: $content) {
      idx
    }
  }
`;

export const DELETE_ANSWER = gql`
  mutation deleteAnswer($idx: Int!) {
    deleteAnswer(idx: $idx) {
      idx
    }
  }
`;
