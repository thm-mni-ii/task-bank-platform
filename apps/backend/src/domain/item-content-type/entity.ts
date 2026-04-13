/**
 * Entity: Item_Content_Type
 * Original schema: Item_Content_Type (item_content_type_id PK, item_content_type_name VARCHAR, description VARCHAR)
 *
 * Entity: Item_Content_Types (junction)
 * Original schema: Item_Content_Types (item_content_type_id PK/UK, item_type_id FK, item_content_type_id FK)
 *
 * NOTE (Schema Inconsistency):
 * The attribute name item_content_type_id appears twice in the original diagram:
 * once as PK/UK and once as FK referencing Item_Content_Type.
 * This is preserved exactly as modeled. In this implementation, we use a generated 'id'
 * as the primary key of the junction record and 'itemContentTypeId' as the FK reference.
 * See docs/domain/schema-notes.md for details.
 */
export interface ItemContentType {
  id: string;
  itemContentTypeName: string;
  description: string;
}

export interface CreateItemContentTypeInput {
  itemContentTypeName: string;
  description: string;
}

export interface UpdateItemContentTypeInput {
  itemContentTypeName?: string;
  description?: string;
}

/**
 * Junction entity: Item_Content_Types
 * Associates an Item_Type with allowed Item_Content_Type entries.
 */
export interface ItemContentTypeAssignment {
  id: string;
  itemTypeId: string;
  itemContentTypeId: string;
}

export interface CreateItemContentTypeAssignmentInput {
  itemTypeId: string;
  itemContentTypeId: string;
}
