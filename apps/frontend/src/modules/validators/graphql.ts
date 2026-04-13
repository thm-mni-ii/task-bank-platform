import gql from 'graphql-tag';

export const GET_VALIDATORS = gql`query { validators { id description validator } }`;
export const CREATE_VALIDATOR = gql`mutation($input: CreateValidatorInput!) { createValidator(input: $input) { id description validator } }`;
export const UPDATE_VALIDATOR = gql`mutation($id: ID!, $input: UpdateValidatorInput!) { updateValidator(id: $id, input: $input) { id description validator } }`;
export const DELETE_VALIDATOR = gql`mutation($id: ID!) { deleteValidator(id: $id) }`;
