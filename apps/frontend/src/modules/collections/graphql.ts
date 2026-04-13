import gql from 'graphql-tag';

export const GET_COLLECTIONS = gql`query { itemCollections { id parentItemId order } }`;
export const GET_COLLECTION = gql`query GetCollection($id: ID!) {
  itemCollection(id: $id) { id parentItemId order }
  subItemsByCollection(itemCollectionId: $id) { itemCollectionId subitemId position }
}`;
export const CREATE_COLLECTION = gql`mutation($input: CreateItemCollectionInput!) { createItemCollection(input: $input) { id parentItemId order } }`;
export const UPDATE_COLLECTION = gql`mutation($id: ID!, $input: UpdateItemCollectionInput!) { updateItemCollection(id: $id, input: $input) { id parentItemId order } }`;
export const DELETE_COLLECTION = gql`mutation($id: ID!) { deleteItemCollection(id: $id) }`;
export const ADD_SUB_ITEM = gql`mutation($input: CreateItemCollectionSubItemInput!) { addSubItem(input: $input) { itemCollectionId subitemId position } }`;
export const REMOVE_SUB_ITEM = gql`mutation($itemCollectionId: ID!, $subitemId: ID!) { removeSubItem(itemCollectionId: $itemCollectionId, subitemId: $subitemId) }`;
export const GET_ITEMS_SIMPLE = gql`query { items { id } }`;
