import gql from 'graphql-tag';

export const GET_TEMPLATES = gql`query { itemRepresentationTemplates { id template } }`;
export const CREATE_TEMPLATE = gql`mutation($input: CreateItemRepresentationTemplateInput!) { createItemRepresentationTemplate(input: $input) { id template } }`;
export const UPDATE_TEMPLATE = gql`mutation($id: ID!, $input: UpdateItemRepresentationTemplateInput!) { updateItemRepresentationTemplate(id: $id, input: $input) { id template } }`;
export const DELETE_TEMPLATE = gql`mutation($id: ID!) { deleteItemRepresentationTemplate(id: $id) }`;
