import { CollectionOrder } from '../common/types';

/**
 * Entity: Item_Collection
 * Original schema: Item_Collection (item_collection_id PK FK, parent_item_id FK,
 *                                   order ENUM "LINEAR | ARBITRARY")
 *
 * NOTE: The original schema contains inline modeling notes in the order field:
 * "(Nullable) Flag if binary? Remove?" — these are preserved in documentation.
 * In this implementation, 'order' is nullable to reflect the original modeling note.
 *
 * Entity: Item_Collection_Sub_Item
 * Original schema: Item_Collection_Sub_Item (item_collection_id PK FK, subitem_id PK FK, position INT)
 */
export interface ItemCollection {
  id: string;
  parentItemId: string;
  order: CollectionOrder | null;
}

export interface CreateItemCollectionInput {
  parentItemId: string;
  order?: CollectionOrder | null;
}

export interface UpdateItemCollectionInput {
  parentItemId?: string;
  order?: CollectionOrder | null;
}

export interface ItemCollectionSubItem {
  itemCollectionId: string;
  subitemId: string;
  position: number;
}

export interface CreateItemCollectionSubItemInput {
  itemCollectionId: string;
  subitemId: string;
  position: number;
}

export interface UpdateItemCollectionSubItemInput {
  position: number;
}
