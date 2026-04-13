import mongoose, { Schema, Document } from 'mongoose';
import { CollectionOrder } from '../../../../domain/common/types';

export interface ItemCollectionDocument extends Document {
  parentItemId: mongoose.Types.ObjectId;
  order: CollectionOrder | null;
}

const ItemCollectionSchema = new Schema<ItemCollectionDocument>(
  {
    parentItemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    order: {
      type: String,
      enum: [...Object.values(CollectionOrder), null],
      default: null,
    },
  },
  { timestamps: true },
);

export const ItemCollectionModel = mongoose.model<ItemCollectionDocument>(
  'ItemCollection',
  ItemCollectionSchema,
  'item_collections',
);
