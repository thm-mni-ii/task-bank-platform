import gql from 'graphql-tag';

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      descriptor
      mail
    }
  }
`;

export const CREATE_AUTHOR = gql`
  mutation CreateAuthor($input: CreateAuthorInput!) {
    createAuthor(input: $input) {
      id
      descriptor
      mail
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($id: ID!, $input: UpdateAuthorInput!) {
    updateAuthor(id: $id, input: $input) {
      id
      descriptor
      mail
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id)
  }
`;
