import gql from 'graphql-tag';

export const GET_TAGS = gql`query GetTags { tags { id parentTagId tag description } }`;
export const CREATE_TAG = gql`mutation CreateTag($input: CreateTagInput!) { createTag(input: $input) { id parentTagId tag description } }`;
export const UPDATE_TAG = gql`mutation UpdateTag($id: ID!, $input: UpdateTagInput!) { updateTag(id: $id, input: $input) { id parentTagId tag description } }`;
export const DELETE_TAG = gql`mutation DeleteTag($id: ID!) { deleteTag(id: $id) }`;
