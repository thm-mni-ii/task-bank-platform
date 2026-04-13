import { ItemContentPurpose } from '../common/types';

/**
 * Entity: Item_Content
 * Original schema: Item_Content (item_content_id PK, license_id FK,
 *                                item_material_type_id FK, author_id FK,
 *                                json_serialized_content NULLABLE, blob_serialized_content NULLABLE)
 *
 * NOTE (Schema Inconsistency):
 * The original schema uses 'item_material_type_id' as the FK name,
 * while the related entity is named 'Item_Content_Type'.
 * This naming mismatch is preserved. In this implementation, we use 'itemMaterialTypeId'
 * to match the original attribute name exactly.
 * See docs/domain/schema-notes.md for details.
 */
export interface ItemContent {
  id: string;
  licenseId: string;
  /** Maps to item_material_type_id in original schema — references Item_Content_Type */
  itemMaterialTypeId: string;
  authorId: string;
  jsonSerializedContent: Record<string, unknown> | null;
  blobSerializedContent: string | null;
}

export interface CreateItemContentInput {
  licenseId: string;
  itemMaterialTypeId: string;
  authorId: string;
  jsonSerializedContent?: Record<string, unknown> | null;
  blobSerializedContent?: string | null;
}

export interface UpdateItemContentInput {
  licenseId?: string;
  itemMaterialTypeId?: string;
  authorId?: string;
  jsonSerializedContent?: Record<string, unknown> | null;
  blobSerializedContent?: string | null;
}

/**
 * Entity: Item_Contents (junction)
 * Original schema: Item_Contents (item_content_id PK, item_material_id FK,
 *                                 item_id FK, purpose ENUM)
 *
 * NOTE (Schema Inconsistency):
 * - 'item_content_id' is the PK of this junction table, NOT an FK to Item_Content.
 * - 'item_material_id' is the actual FK to Item_Content, despite the naming mismatch.
 * In this implementation, we use 'id' for the PK and 'itemMaterialId' for the FK
 * to preserve the original naming scheme.
 * See docs/domain/schema-notes.md for details.
 */
export interface ItemContents {
  id: string;
  /** Maps to item_material_id in original schema — FK to Item_Content */
  itemMaterialId: string;
  itemId: string;
  purpose: ItemContentPurpose;
}

export interface CreateItemContentsInput {
  itemMaterialId: string;
  itemId: string;
  purpose: ItemContentPurpose;
}

export interface UpdateItemContentsInput {
  purpose?: ItemContentPurpose;
}
