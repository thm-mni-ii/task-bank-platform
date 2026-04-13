import gql from 'graphql-tag';

export const GET_ITEM_CONTENTS = gql`query { itemContents { id licenseId itemMaterialTypeId authorId jsonSerializedContent } }`;
export const CREATE_ITEM_CONTENT = gql`mutation($input: CreateItemContentInput!) { createItemContent(input: $input) { id licenseId itemMaterialTypeId authorId jsonSerializedContent } }`;
export const UPDATE_ITEM_CONTENT = gql`mutation($id: ID!, $input: UpdateItemContentInput!) { updateItemContent(id: $id, input: $input) { id licenseId itemMaterialTypeId authorId jsonSerializedContent } }`;
export const DELETE_ITEM_CONTENT = gql`mutation($id: ID!) { deleteItemContent(id: $id) }`;
