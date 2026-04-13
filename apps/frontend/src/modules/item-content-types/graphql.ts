import gql from 'graphql-tag';

export const GET_ITEM_CONTENT_TYPES = gql`query { itemContentTypes { id itemContentTypeName description } }`;
export const CREATE_ITEM_CONTENT_TYPE = gql`mutation($input: CreateItemContentTypeInput!) { createItemContentType(input: $input) { id itemContentTypeName description } }`;
export const UPDATE_ITEM_CONTENT_TYPE = gql`mutation($id: ID!, $input: UpdateItemContentTypeInput!) { updateItemContentType(id: $id, input: $input) { id itemContentTypeName description } }`;
export const DELETE_ITEM_CONTENT_TYPE = gql`mutation($id: ID!) { deleteItemContentType(id: $id) }`;
