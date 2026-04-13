import mongoose, { Schema, Document } from 'mongoose';

export interface ItemCollectionSubItemDocument extends Document {
  itemCollectionId: mongoose.Types.ObjectId;
  subitemId: mongoose.Types.ObjectId;
  position: number;
}

const ItemCollectionSubItemSchema = new Schema<ItemCollectionSubItemDocument>(
  {
    itemCollectionId: {
      type: Schema.Types.ObjectId,
      ref: 'ItemCollection',
      required: true,
    },
    subitemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    position: { type: Number, required: true },
  },
  { timestamps: true },
);

ItemCollectionSubItemSchema.index({ itemCollectionId: 1, subitemId: 1 }, { unique: true });

export const ItemCollectionSubItemModel = mongoose.model<ItemCollectionSubItemDocument>(
  'ItemCollectionSubItem',
  ItemCollectionSubItemSchema,
  'item_collection_sub_items',
);
