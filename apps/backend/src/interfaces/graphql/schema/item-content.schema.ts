export const itemContentTypeDefs = `
  enum ItemContentPurpose {
    STIMULUS
    SOLUTION
  }

  """
  Entity: Item_Content
  NOTE: itemMaterialTypeId maps to original 'item_material_type_id' —
  FK to Item_Content_Type despite naming mismatch.
  """
  type ItemContent {
    id: ID!
    licenseId: ID!
    itemMaterialTypeId: ID!
    authorId: ID!
    jsonSerializedContent: JSON
    blobSerializedContent: String
  }

  input CreateItemContentInput {
    licenseId: ID!
    itemMaterialTypeId: ID!
    authorId: ID!
    jsonSerializedContent: JSON
    blobSerializedContent: String
  }

  input UpdateItemContentInput {
    licenseId: ID
    itemMaterialTypeId: ID
    authorId: ID
    jsonSerializedContent: JSON
    blobSerializedContent: String
  }

  """
  Junction entity: Item_Contents
  NOTE: 'itemMaterialId' maps to original 'item_material_id' — FK to Item_Content.
  The PK in original schema is confusingly named 'item_content_id'.
  """
  type ItemContentsAssignment {
    id: ID!
    itemMaterialId: ID!
    itemId: ID!
    purpose: ItemContentPurpose!
  }

  input CreateItemContentsInput {
    itemMaterialId: ID!
    itemId: ID!
    purpose: ItemContentPurpose!
  }

  input UpdateItemContentsInput {
    purpose: ItemContentPurpose
  }

  extend type Query {
    itemContents: [ItemContent!]!
    itemContent(id: ID!): ItemContent
    itemContentsAssignments: [ItemContentsAssignment!]!
    itemContentsAssignmentsByItem(itemId: ID!): [ItemContentsAssignment!]!
  }

  extend type Mutation {
    createItemContent(input: CreateItemContentInput!): ItemContent!
    updateItemContent(id: ID!, input: UpdateItemContentInput!): ItemContent!
    deleteItemContent(id: ID!): Boolean!
    createItemContentsAssignment(input: CreateItemContentsInput!): ItemContentsAssignment!
    updateItemContentsAssignment(id: ID!, input: UpdateItemContentsInput!): ItemContentsAssignment!
    deleteItemContentsAssignment(id: ID!): Boolean!
  }
`;
