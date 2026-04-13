export const licenseTypeDefs = `
  enum LicenseType {
    CC0
    CC_BY
    CC_BY_SA
    CC_BY_NC
    CC_BY_NC_SA
    CC_BY_ND
    CC_BY_NC_ND
  }

  type License {
    id: ID!
    license: LicenseType!
  }

  input CreateLicenseInput {
    license: LicenseType!
  }

  input UpdateLicenseInput {
    license: LicenseType
  }

  extend type Query {
    licenses: [License!]!
    license(id: ID!): License
  }

  extend type Mutation {
    createLicense(input: CreateLicenseInput!): License!
    updateLicense(id: ID!, input: UpdateLicenseInput!): License!
    deleteLicense(id: ID!): Boolean!
  }
`;
