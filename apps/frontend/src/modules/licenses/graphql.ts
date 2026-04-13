import gql from 'graphql-tag';

export const GET_LICENSES = gql`
  query GetLicenses {
    licenses {
      id
      license
    }
  }
`;
export const CREATE_LICENSE = gql`
  mutation CreateLicense($input: CreateLicenseInput!) {
    createLicense(input: $input) {
      id
      license
    }
  }
`;
export const UPDATE_LICENSE = gql`
  mutation UpdateLicense($id: ID!, $input: UpdateLicenseInput!) {
    updateLicense(id: $id, input: $input) {
      id
      license
    }
  }
`;
export const DELETE_LICENSE = gql`
  mutation DeleteLicense($id: ID!) {
    deleteLicense(id: $id)
  }
`;
