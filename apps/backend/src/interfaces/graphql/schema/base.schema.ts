export const baseTypeDefs = `
  scalar JSON

  type Query {
    health: HealthCheck!
  }

  type Mutation {
    _empty: String
  }

  type HealthCheck {
    status: String!
    timestamp: String!
    version: String!
  }
`;
