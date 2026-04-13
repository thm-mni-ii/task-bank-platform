export const itemCollectionTypeDefs = `
  enum CollectionOrder {
    LINEAR
    ARBITRARY
  }

  type ItemCollection {
    id: ID!
    parentItemId: ID!
    order: CollectionOrder
  }

  input CreateItemCollectionInput {
    parentItemId: ID!
    order: CollectionOrder
  }

  input UpdateItemCollectionInput {
    parentItemId: ID
    order: CollectionOrder
  }

  type ItemCollectionSubItem {
    itemCollectionId: ID!
    subitemId: ID!
    position: Int!
  }

  input CreateItemCollectionSubItemInput {
    itemCollectionId: ID!
    subitemId: ID!
    position: Int!
  }

  input UpdateItemCollectionSubItemInput {
    position: Int!
  }

  extend type Query {
    itemCollections: [ItemCollection!]!
    itemCollection(id: ID!): ItemCollection
    itemCollectionSubItems(collectionId: ID!): [ItemCollectionSubItem!]!
  }

  extend type Mutation {
    createItemCollection(input: CreateItemCollectionInput!): ItemCollection!
    updateItemCollection(id: ID!, input: UpdateItemCollectionInput!): ItemCollection!
    deleteItemCollection(id: ID!): Boolean!
    addSubItemToCollection(input: CreateItemCollectionSubItemInput!): ItemCollectionSubItem!
    updateSubItemPosition(collectionId: ID!, subitemId: ID!, input: UpdateItemCollectionSubItemInput!): ItemCollectionSubItem!
    removeSubItemFromCollection(collectionId: ID!, subitemId: ID!): Boolean!
  }
`;
