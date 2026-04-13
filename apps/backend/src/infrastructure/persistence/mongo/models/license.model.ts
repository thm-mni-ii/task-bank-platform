import mongoose, { Schema, Document } from 'mongoose';
import { LicenseType } from '../../../../domain/common/types';

export interface LicenseDocument extends Document {
  license: LicenseType;
}

const LicenseSchema = new Schema<LicenseDocument>(
  {
    license: {
      type: String,
      required: true,
      enum: Object.values(LicenseType),
    },
  },
  { timestamps: true },
);

export const LicenseModel = mongoose.model<LicenseDocument>('License', LicenseSchema, 'licenses');
