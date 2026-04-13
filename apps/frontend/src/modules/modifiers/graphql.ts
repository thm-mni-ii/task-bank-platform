import gql from 'graphql-tag';

export const GET_MODIFIERS = gql`query { modifiers { id description modifier } }`;
export const CREATE_MODIFIER = gql`mutation($input: CreateModifierInput!) { createModifier(input: $input) { id description modifier } }`;
export const UPDATE_MODIFIER = gql`mutation($id: ID!, $input: UpdateModifierInput!) { updateModifier(id: $id, input: $input) { id description modifier } }`;
export const DELETE_MODIFIER = gql`mutation($id: ID!) { deleteModifier(id: $id) }`;
