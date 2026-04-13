import mongoose, { Schema, Document } from 'mongoose';

export interface ItemRepresentationTemplateDocument extends Document {
  template: Record<string, unknown>;
}

const ItemRepresentationTemplateSchema = new Schema<ItemRepresentationTemplateDocument>(
  {
    template: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true },
);

export const ItemRepresentationTemplateModel = mongoose.model<ItemRepresentationTemplateDocument>(
  'ItemRepresentationTemplate',
  ItemRepresentationTemplateSchema,
  'item_representation_templates',
);
