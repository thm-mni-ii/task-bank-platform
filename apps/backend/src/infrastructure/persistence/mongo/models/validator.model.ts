import mongoose, { Schema, Document } from 'mongoose';

export interface ValidatorDocument extends Document {
  description: string;
  validator: string;
}

const ValidatorSchema = new Schema<ValidatorDocument>(
  {
    description: { type: String, required: true },
    validator: { type: String, required: true },
  },
  { timestamps: true },
);

export const ValidatorModel = mongoose.model<ValidatorDocument>(
  'Validator',
  ValidatorSchema,
  'validators',
);
