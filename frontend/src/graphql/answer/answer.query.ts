import { gql } from "@apollo/client";

export const ANSWERS = gql`
  query answers($questionIdx: Int!) {
    answers(questionIdx: $questionIdx) {
      idx
      content
      user {
        idx
        avatar
        name
        bio
        score
      }
      userIdx
      createdAt
      updatedAt
      commentCount
    }
  }
`;
