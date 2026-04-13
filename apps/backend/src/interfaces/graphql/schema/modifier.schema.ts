export const modifierTypeDefs = `
  type Modifier {
    id: ID!
    description: String!
    modifier: String!
  }

  input CreateModifierInput {
    description: String!
    modifier: String!
  }

  input UpdateModifierInput {
    description: String
    modifier: String
  }

  type ItemModifier {
    itemId: ID!
    modifierId: ID!
  }

  extend type Query {
    modifiers: [Modifier!]!
    modifier(id: ID!): Modifier
    itemModifiers(itemId: ID!): [ItemModifier!]!
  }

  extend type Mutation {
    createModifier(input: CreateModifierInput!): Modifier!
    updateModifier(id: ID!, input: UpdateModifierInput!): Modifier!
    deleteModifier(id: ID!): Boolean!
    addModifierToItem(itemId: ID!, modifierId: ID!): ItemModifier!
    removeModifierFromItem(itemId: ID!, modifierId: ID!): Boolean!
  }
`;
