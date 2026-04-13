import gql from 'graphql-tag';

export const GET_ITEM_TYPES = gql`query { itemTypes { id itemTypeName description } }`;
export const CREATE_ITEM_TYPE = gql`mutation($input: CreateItemTypeInput!) { createItemType(input: $input) { id itemTypeName description } }`;
export const UPDATE_ITEM_TYPE = gql`mutation($id: ID!, $input: UpdateItemTypeInput!) { updateItemType(id: $id, input: $input) { id itemTypeName description } }`;
export const DELETE_ITEM_TYPE = gql`mutation($id: ID!) { deleteItemType(id: $id) }`;
