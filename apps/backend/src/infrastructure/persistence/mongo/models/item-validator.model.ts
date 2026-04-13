import mongoose, { Schema, Document } from 'mongoose';

export interface ItemValidatorDocument extends Document {
  validatorId: mongoose.Types.ObjectId;
  itemId: mongoose.Types.ObjectId;
}

const ItemValidatorSchema = new Schema<ItemValidatorDocument>(
  {
    validatorId: { type: Schema.Types.ObjectId, ref: 'Validator', required: true },
    itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  },
  { timestamps: true },
);

ItemValidatorSchema.index({ validatorId: 1, itemId: 1 }, { unique: true });

export const ItemValidatorModel = mongoose.model<ItemValidatorDocument>(
  'ItemValidator',
  ItemValidatorSchema,
  'item_validators',
);
