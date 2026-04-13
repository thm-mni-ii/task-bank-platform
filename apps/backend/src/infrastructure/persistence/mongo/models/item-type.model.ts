import mongoose, { Schema, Document } from 'mongoose';

export interface ItemTypeDocument extends Document {
  itemTypeName: string;
  description: string;
}

const ItemTypeSchema = new Schema<ItemTypeDocument>(
  {
    itemTypeName: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const ItemTypeModel = mongoose.model<ItemTypeDocument>(
  'ItemType',
  ItemTypeSchema,
  'item_types',
);
