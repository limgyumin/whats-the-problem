import gql from "graphql-tag";

export const CREATE_QUESTION = gql`
  mutation createQuestion($question: CreateQuestionInput!) {
    createQuestion(question: $question) {
      idx
      title
      url
    }
  }
`;
