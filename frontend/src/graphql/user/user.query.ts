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

export const MY_PROFILE_DETAIL = gql`
  query me($post_option: UserPostOption!, $question_option: UserQuestionOption!) {
    me {
      idx
      avatar
      name
      bio
      score
      createdAt
      posts(option: $post_option}) {
        title
        content
        thumbnail
        likeCount
        commentCount
        createdAt
      }
      questions(option: $question_option) {
        title
        content
        createdAt
        answerCount
      }
    }
  }
`;
