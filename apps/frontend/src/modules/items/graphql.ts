import gql from 'graphql-tag';

export const GET_ITEMS = gql`query {
  items { id authorId licenseId itemTypeId itemTemplateId rootItemId }
}`;

export const GET_ITEM = gql`query GetItem($id: ID!) {
  item(id: $id) { id authorId licenseId itemTypeId itemTemplateId rootItemId }
  tagsByItem(itemId: $id) { id tag }
  modifiersByItem(itemId: $id) { id modifier }
  validatorsByItem(itemId: $id) { id validator }
  itemContentsByItem(itemId: $id) { id itemMaterialId itemId purpose }
}`;

export const CREATE_ITEM = gql`mutation($input: CreateItemInput!) {
  createItem(input: $input) { id authorId licenseId itemTypeId itemTemplateId rootItemId }
}`;

export const UPDATE_ITEM = gql`mutation($id: ID!, $input: UpdateItemInput!) {
  updateItem(id: $id, input: $input) { id authorId licenseId itemTypeId itemTemplateId rootItemId }
}`;

export const DELETE_ITEM = gql`mutation($id: ID!) { deleteItem(id: $id) }`;

export const ADD_TAG_TO_ITEM = gql`mutation($itemId: ID!, $tagId: ID!) { addTagToItem(itemId: $itemId, tagId: $tagId) { itemId tagId } }`;
export const REMOVE_TAG_FROM_ITEM = gql`mutation($itemId: ID!, $tagId: ID!) { removeTagFromItem(itemId: $itemId, tagId: $tagId) }`;

export const ADD_MODIFIER_TO_ITEM = gql`mutation($itemId: ID!, $modifierId: ID!) { addModifierToItem(itemId: $itemId, modifierId: $modifierId) { itemId modifierId } }`;
export const REMOVE_MODIFIER_FROM_ITEM = gql`mutation($itemId: ID!, $modifierId: ID!) { removeModifierFromItem(itemId: $itemId, modifierId: $modifierId) }`;

export const ADD_VALIDATOR_TO_ITEM = gql`mutation($itemId: ID!, $validatorId: ID!) { addValidatorToItem(itemId: $itemId, validatorId: $validatorId) { itemId validatorId } }`;
export const REMOVE_VALIDATOR_FROM_ITEM = gql`mutation($itemId: ID!, $validatorId: ID!) { removeValidatorFromItem(itemId: $itemId, validatorId: $validatorId) }`;

export const GET_AUTHORS_SIMPLE = gql`query { authors { id descriptor } }`;
export const GET_LICENSES_SIMPLE = gql`query { licenses { id license } }`;
export const GET_ITEM_TYPES_SIMPLE = gql`query { itemTypes { id itemTypeName } }`;
export const GET_TEMPLATES_SIMPLE = gql`query { itemRepresentationTemplates { id } }`;
export const GET_TAGS_SIMPLE = gql`query { tags { id tag } }`;
export const GET_MODIFIERS_SIMPLE = gql`query { modifiers { id modifier } }`;
export const GET_VALIDATORS_SIMPLE = gql`query { validators { id validator } }`;
