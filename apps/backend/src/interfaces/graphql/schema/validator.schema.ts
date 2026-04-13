export const validatorTypeDefs = `
  type Validator {
    id: ID!
    description: String!
    validator: String!
  }

  input CreateValidatorInput {
    description: String!
    validator: String!
  }

  input UpdateValidatorInput {
    description: String
    validator: String
  }

  type ItemValidator {
    validatorId: ID!
    itemId: ID!
  }

  extend type Query {
    validators: [Validator!]!
    validator(id: ID!): Validator
    itemValidators(itemId: ID!): [ItemValidator!]!
  }

  extend type Mutation {
    createValidator(input: CreateValidatorInput!): Validator!
    updateValidator(id: ID!, input: UpdateValidatorInput!): Validator!
    deleteValidator(id: ID!): Boolean!
    addValidatorToItem(validatorId: ID!, itemId: ID!): ItemValidator!
    removeValidatorFromItem(validatorId: ID!, itemId: ID!): Boolean!
  }
`;
