import mongoose, { Schema, Document } from 'mongoose';

/**
 * NOTE (Schema Inconsistency):
 * Original schema 'Item_Content_Tags' has 'item_id' as attribute,
 * but the ER diagram relationship points to Item_Content.
 * This implementation preserves 'itemId' as per the attribute list.
 * See docs/domain/schema-notes.md for details.
 */
export interface ItemContentTagDocument extends Document {
  itemId: mongoose.Types.ObjectId;
  tagId: mongoose.Types.ObjectId;
}

const ItemContentTagSchema = new Schema<ItemContentTagDocument>(
  {
    itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    tagId: { type: Schema.Types.ObjectId, ref: 'Tag', required: true },
  },
  { timestamps: true },
);

ItemContentTagSchema.index({ itemId: 1, tagId: 1 }, { unique: true });

export const ItemContentTagModel = mongoose.model<ItemContentTagDocument>(
  'ItemContentTag',
  ItemContentTagSchema,
  'item_content_tags',
);
