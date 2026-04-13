export const itemTypeTypeDefs = `
  type ItemType {
    id: ID!
    itemTypeName: String!
    description: String!
  }

  input CreateItemTypeInput {
    itemTypeName: String!
    description: String!
  }

  input UpdateItemTypeInput {
    itemTypeName: String
    description: String
  }

  extend type Query {
    itemTypes: [ItemType!]!
    itemType(id: ID!): ItemType
  }

  extend type Mutation {
    createItemType(input: CreateItemTypeInput!): ItemType!
    updateItemType(id: ID!, input: UpdateItemTypeInput!): ItemType!
    deleteItemType(id: ID!): Boolean!
  }
`;
