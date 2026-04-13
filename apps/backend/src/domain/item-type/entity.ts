/**
 * Entity: Item_Type
 * Original schema: Item_Type (item_type_id PK, item_type_name VARCHAR, description VARCHAR)
 * Represents the general type/category of an Item.
 */
export interface ItemType {
  id: string;
  itemTypeName: string;
  description: string;
}

export interface CreateItemTypeInput {
  itemTypeName: string;
  description: string;
}

export interface UpdateItemTypeInput {
  itemTypeName?: string;
  description?: string;
}
