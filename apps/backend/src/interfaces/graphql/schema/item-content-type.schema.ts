export const itemContentTypeTypeDefs = `
  type ItemContentType {
    id: ID!
    itemContentTypeName: String!
    description: String!
  }

  input CreateItemContentTypeInput {
    itemContentTypeName: String!
    description: String!
  }

  input UpdateItemContentTypeInput {
    itemContentTypeName: String
    description: String
  }

  """
  Junction entity Item_Content_Types.
  NOTE: Original schema has item_content_type_id as both PK/UK and FK.
  In this implementation, 'id' is the generated PK and
  'itemContentTypeId' is the FK to ItemContentType.
  """
  type ItemContentTypeAssignment {
    id: ID!
    itemTypeId: ID!
    itemContentTypeId: ID!
  }

  input CreateItemContentTypeAssignmentInput {
    itemTypeId: ID!
    itemContentTypeId: ID!
  }

  extend type Query {
    itemContentTypes: [ItemContentType!]!
    itemContentType(id: ID!): ItemContentType
    itemContentTypeAssignments: [ItemContentTypeAssignment!]!
    itemContentTypeAssignmentsByItemType(itemTypeId: ID!): [ItemContentTypeAssignment!]!
  }

  extend type Mutation {
    createItemContentType(input: CreateItemContentTypeInput!): ItemContentType!
    updateItemContentType(id: ID!, input: UpdateItemContentTypeInput!): ItemContentType!
    deleteItemContentType(id: ID!): Boolean!
    createItemContentTypeAssignment(input: CreateItemContentTypeAssignmentInput!): ItemContentTypeAssignment!
    deleteItemContentTypeAssignment(id: ID!): Boolean!
  }
`;
