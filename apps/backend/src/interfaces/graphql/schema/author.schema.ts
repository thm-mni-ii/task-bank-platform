export const authorTypeDefs = `
  type Author {
    id: ID!
    descriptor: String!
    mail: String!
  }

  input CreateAuthorInput {
    descriptor: String!
    mail: String!
  }

  input UpdateAuthorInput {
    descriptor: String
    mail: String
  }

  extend type Query {
    authors: [Author!]!
    author(id: ID!): Author
  }

  extend type Mutation {
    createAuthor(input: CreateAuthorInput!): Author!
    updateAuthor(id: ID!, input: UpdateAuthorInput!): Author!
    deleteAuthor(id: ID!): Boolean!
  }
`;
