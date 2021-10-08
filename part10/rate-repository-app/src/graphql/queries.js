import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
query {
    repositories{
      edges{
        node{
          id
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_AUTHORIZATION = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;