import mongoose, { Schema, Document } from 'mongoose';

export interface ModifierDocument extends Document {
  description: string;
  modifier: string;
}

const ModifierSchema = new Schema<ModifierDocument>(
  {
    description: { type: String, required: true },
    modifier: { type: String, required: true },
  },
  { timestamps: true },
);

export const ModifierModel = mongoose.model<ModifierDocument>(
  'Modifier',
  ModifierSchema,
  'modifiers',
);
