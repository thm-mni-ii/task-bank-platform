import mongoose, { Schema, Document } from 'mongoose';

export interface ItemTagDocument extends Document {
  itemId: mongoose.Types.ObjectId;
  tagId: mongoose.Types.ObjectId;
}

const ItemTagSchema = new Schema<ItemTagDocument>(
  {
    itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    tagId: { type: Schema.Types.ObjectId, ref: 'Tag', required: true },
  },
  { timestamps: true },
);

ItemTagSchema.index({ itemId: 1, tagId: 1 }, { unique: true });

export const ItemTagModel = mongoose.model<ItemTagDocument>('ItemTag', ItemTagSchema, 'item_tags');
