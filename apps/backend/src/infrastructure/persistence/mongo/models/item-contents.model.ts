import mongoose, { Schema, Document } from 'mongoose';
import { ItemContentPurpose } from '../../../../domain/common/types';

/**
 * NOTE (Schema Inconsistency):
 * Original entity 'Item_Contents':
 * - item_content_id is the PK of this junction table (NOT an FK to Item_Content)
 * - item_material_id is the actual FK to Item_Content
 * These naming anomalies are preserved. 'itemMaterialId' references Item_Content.
 */
export interface ItemContentsDocument extends Document {
  /** Maps to item_material_id — FK to Item_Content */
  itemMaterialId: mongoose.Types.ObjectId;
  itemId: mongoose.Types.ObjectId;
  purpose: ItemContentPurpose;
}

const ItemContentsSchema = new Schema<ItemContentsDocument>(
  {
    itemMaterialId: { type: Schema.Types.ObjectId, ref: 'ItemContent', required: true },
    itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    purpose: {
      type: String,
      required: true,
      enum: Object.values(ItemContentPurpose),
    },
  },
  { timestamps: true },
);

export const ItemContentsModel = mongoose.model<ItemContentsDocument>(
  'ItemContents',
  ItemContentsSchema,
  'item_contents_assignments',
);
