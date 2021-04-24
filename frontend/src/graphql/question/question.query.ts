import gql from "graphql-tag";

export const QUESTIONS = gql`
  query($questionType: QuestionType!, $option: QuestionOption!) {
    questionCount
    questions(questionType: $questionType, option: $option) {
      idx
      title
      content
      user {
        name
      }
      answerCount
      tags {
        idx
        name
      }
      createdAt
      updatedAt
    }
  }
`;
