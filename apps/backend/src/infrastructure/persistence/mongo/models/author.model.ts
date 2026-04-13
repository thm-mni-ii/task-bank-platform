import mongoose, { Schema, Document } from 'mongoose';

export interface AuthorDocument extends Document {
  descriptor: string;
  mail: string;
}

const AuthorSchema = new Schema<AuthorDocument>(
  {
    descriptor: { type: String, required: true },
    mail: { type: String, required: true },
  },
  { timestamps: true },
);

export const AuthorModel = mongoose.model<AuthorDocument>('Author', AuthorSchema, 'authors');
