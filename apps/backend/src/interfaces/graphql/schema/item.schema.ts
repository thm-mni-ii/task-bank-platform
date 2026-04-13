export const itemTypeDefs = `
  type Item {
    id: ID!
    authorId: ID!
    licenseId: ID!
    itemTypeId: ID!
    itemTemplateId: ID!
    rootItemId: ID
  }

  input CreateItemInput {
    authorId: ID!
    licenseId: ID!
    itemTypeId: ID!
    itemTemplateId: ID!
    rootItemId: ID
  }

  input UpdateItemInput {
    authorId: ID
    licenseId: ID
    itemTypeId: ID
    itemTemplateId: ID
    rootItemId: ID
  }

  type ItemRepresentationTemplate {
    id: ID!
    template: JSON!
  }

  input CreateItemRepresentationTemplateInput {
    template: JSON!
  }

  input UpdateItemRepresentationTemplateInput {
    template: JSON
  }

  extend type Query {
    items: [Item!]!
    item(id: ID!): Item
    itemVariants(rootItemId: ID!): [Item!]!
    itemRepresentationTemplates: [ItemRepresentationTemplate!]!
    itemRepresentationTemplate(id: ID!): ItemRepresentationTemplate
  }

  extend type Mutation {
    createItem(input: CreateItemInput!): Item!
    updateItem(id: ID!, input: UpdateItemInput!): Item!
    deleteItem(id: ID!): Boolean!
    createItemRepresentationTemplate(input: CreateItemRepresentationTemplateInput!): ItemRepresentationTemplate!
    updateItemRepresentationTemplate(id: ID!, input: UpdateItemRepresentationTemplateInput!): ItemRepresentationTemplate!
    deleteItemRepresentationTemplate(id: ID!): Boolean!
  }
`;
