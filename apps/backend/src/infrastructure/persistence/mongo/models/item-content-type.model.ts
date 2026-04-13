import mongoose, { Schema, Document } from 'mongoose';

export interface ItemContentTypeDocument extends Document {
  itemContentTypeName: string;
  description: string;
}

const ItemContentTypeSchema = new Schema<ItemContentTypeDocument>(
  {
    itemContentTypeName: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const ItemContentTypeModel = mongoose.model<ItemContentTypeDocument>(
  'ItemContentType',
  ItemContentTypeSchema,
  'item_content_types',
);
