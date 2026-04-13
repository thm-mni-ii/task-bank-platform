import mongoose, { Schema, Document } from 'mongoose';

export interface ItemDocument extends Document {
  authorId: mongoose.Types.ObjectId;
  licenseId: mongoose.Types.ObjectId;
  itemTypeId: mongoose.Types.ObjectId;
  itemTemplateId: mongoose.Types.ObjectId;
  rootItemId: mongoose.Types.ObjectId | null;
}

const ItemSchema = new Schema<ItemDocument>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    licenseId: { type: Schema.Types.ObjectId, ref: 'License', required: true },
    itemTypeId: { type: Schema.Types.ObjectId, ref: 'ItemType', required: true },
    itemTemplateId: {
      type: Schema.Types.ObjectId,
      ref: 'ItemRepresentationTemplate',
      required: true,
    },
    rootItemId: { type: Schema.Types.ObjectId, ref: 'Item', default: null },
  },
  { timestamps: true },
);

export const ItemModel = mongoose.model<ItemDocument>('Item', ItemSchema, 'items');
