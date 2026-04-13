import mongoose, { Schema, Document } from 'mongoose';

export interface ItemModifierDocument extends Document {
  itemId: mongoose.Types.ObjectId;
  modifierId: mongoose.Types.ObjectId;
}

const ItemModifierSchema = new Schema<ItemModifierDocument>(
  {
    itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    modifierId: { type: Schema.Types.ObjectId, ref: 'Modifier', required: true },
  },
  { timestamps: true },
);

ItemModifierSchema.index({ itemId: 1, modifierId: 1 }, { unique: true });

export const ItemModifierModel = mongoose.model<ItemModifierDocument>(
  'ItemModifier',
  ItemModifierSchema,
  'item_modifiers',
);
