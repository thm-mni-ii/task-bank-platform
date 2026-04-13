export const tagTypeDefs = `
  type Tag {
    id: ID!
    parentTagId: ID
    tag: String!
    description: String!
  }

  input CreateTagInput {
    parentTagId: ID
    tag: String!
    description: String!
  }

  input UpdateTagInput {
    parentTagId: ID
    tag: String
    description: String
  }

  type ItemTag {
    itemId: ID!
    tagId: ID!
  }

  """
  Item_Content_Tags junction entity.
  NOTE: Uses itemId per original schema attribute list,
  even though the ER diagram relationship points to Item_Content.
  """
  type ItemContentTag {
    itemId: ID!
    tagId: ID!
  }

  extend type Query {
    tags: [Tag!]!
    tag(id: ID!): Tag
    rootTags: [Tag!]!
    childTags(parentTagId: ID!): [Tag!]!
    itemTags(itemId: ID!): [ItemTag!]!
    itemContentTags(itemId: ID!): [ItemContentTag!]!
  }

  extend type Mutation {
    createTag(input: CreateTagInput!): Tag!
    updateTag(id: ID!, input: UpdateTagInput!): Tag!
    deleteTag(id: ID!): Boolean!
    addTagToItem(itemId: ID!, tagId: ID!): ItemTag!
    removeTagFromItem(itemId: ID!, tagId: ID!): Boolean!
    addContentTag(itemId: ID!, tagId: ID!): ItemContentTag!
    removeContentTag(itemId: ID!, tagId: ID!): Boolean!
  }
`;
