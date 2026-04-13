/**
 * Entity: Tag
 * Original schema: Tag (tag_id PK, parent_tag_id FK NULLABLE, tag VARCHAR, description VARCHAR)
 * Tags can be hierarchical via parent_tag_id.
 *
 * Entity: Item_Tags (junction)
 * Original schema: Item_Tags (item_id PK FK, tag_id PK FK)
 *
 * Entity: Item_Content_Tags (junction)
 * Original schema: Item_Content_Tags (item_id PK FK, tag_id PK FK)
 *
 * NOTE (Schema Inconsistency):
 * The original ER diagram connects Item_Content_Tags to Item_Content via relationship,
 * but the attribute list contains item_id rather than item_content_id.
 * This is preserved as-is per the schema preservation requirement.
 * See docs/domain/schema-notes.md for details.
 */
export interface Tag {
  id: string;
  parentTagId: string | null;
  tag: string;
  description: string;
}

export interface CreateTagInput {
  parentTagId?: string | null;
  tag: string;
  description: string;
}

export interface UpdateTagInput {
  parentTagId?: string | null;
  tag?: string;
  description?: string;
}

/** Junction entity: Item_Tags */
export interface ItemTag {
  itemId: string;
  tagId: string;
}

/**
 * Junction entity: Item_Content_Tags
 * NOTE: Uses itemId as per original schema attribute list,
 * even though the relationship in the ER diagram points to Item_Content.
 */
export interface ItemContentTag {
  itemId: string;
  tagId: string;
}
