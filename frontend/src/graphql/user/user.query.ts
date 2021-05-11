import { gql } from "@apollo/client";

export const MY_PROFILE = gql`
  query me {
    me {
      idx
      avatar
      name
      id
      bio
    }
  }
`;

export const MY_DETAIL_PROFILE = gql`
  query($postOption: PostOption!, $questionOption: QuestionOption!) {
    me {
      idx
      avatar
      name
      bio
      score
      createdAt
    }
  }
`;

export const MY_PROFILE_POSTS = gql`
  query($option: PostOption!) {
    me {
      posts(option: $option) {
        idx
        title
        content
        thumbnail
        tags {
          idx
          name
        }
      }
    }
  }
`;

export const MY_PROFILE_QUESTIONS = gql`
  query($option: QuestionOption!) {
    me {
      questions(option: $option) {
        idx
        title
        content
        isTemp
        user
      }
    }
  }
`;
