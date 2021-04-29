import gql from "graphql-tag";

export const QUESTIONS = gql`
  query($questionType: QuestionType!, $option: QuestionOption!) {
    questionCount
    questions(questionType: $questionType, option: $option) {
      idx
      title
      content
      url
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

export const QUESTION = gql`
  query question($url: String!) {
    question(url: $url) {
      idx
      title
      content
      url
      uuid
      userIdx
      user {
        idx
        avatar
        id
        name
        bio
        score
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
